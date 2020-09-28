import React from 'react'
import { connect } from 'react-redux'
import '../styles/modal.css'
import Chart from 'chart.js';
import { compareTo, restartComparison } from '../redux/actions/comparisonActions'
import { closeModal, getGender, activeComparisonCard } from '../Util'

const InfoModal = (props) =>{  

  const compareToHandler = (e) => {
    props.restartComparison()
    const current = e.currentTarget.id
    const id=current.substring(current.indexOf('-')+1)
    props.compareTo(props.pokemonFeatures.features.filter(pokemon => parseInt(pokemon.id)===parseInt(id))[0])
    activeComparisonCard()
    closeModal(0)
  }

  const closeHandler = () =>{
    closeModal(0)
  }

  const createChart = (stats) => {
    const ctx = document.getElementById('myChart');
    Chart.helpers.each(Chart.instances, function(instance){
      if(instance.chart.canvas.id==='myChart'){
        instance.chart.destroy()
      } 
    })
    const labels= stats.map((stat)=>(
        stat= stat.stat.name
    ))
    const data= stats.map((stat)=>(
      stat= stat.base_stat
    ))
    new Chart(ctx, {
      type: 'bar',
      responsive: true , 
      data: {
        labels: labels,
        datasets: [{
          categoryPercentage:0.8,
          data: data,
          backgroundColor: '#167a69', 
          borderColor: '#167a69',
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Stats',
          fontSize: 17
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 25,
              padding: 5
            },
            gridLines: {
              display: true, 
              drawOnChartArea: false,
              color: 'rgb(0, 0, 0)',
              tickMarkLength: 3
            },
          }],
          xAxes: [{
            ticks: {
              padding: 5
            },
            gridLines: {
              display: true,
              drawOnChartArea: false,
              color: 'rgb(0, 0, 0)',
              offsetGridLines: false,
              tickMarkLength: 5
            },
          }]
        }
      }
    })
  }

  const fillChart= (stats)=>{
    setTimeout( () => {
      createChart(stats)
      },100)
  }

  return(
    <div className='container'>
      <div className='backdrop' onClick={closeHandler}></div>
      <div className='modal' >
        { props.currentPokemon !==0 ?  
        <div>
          <div className='modal-header'>
            <div className='modal-header-items'>
              <div className='modal-pokemon-name'>
                {props.currentPokemon.name.toUpperCase()}
              </div>
              <button id={props.currentPokemon.name+'-'+props.currentPokemon.id} className='compare-button' onClick= {compareToHandler}>Compare to...</button>
            </div>
            <div className='out-modal' onClick={closeHandler}>x</div>
          </div>
          <div className='modal-body'>
            <div className='modal-image-container'>
              <img className='modal-image' 
              src={ 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + props.currentPokemon.id + '.png'}
              alt={props.currentPokemon.name} 
              />
            </div>
            <div className='modal-pokemon-details'>
              <div className='details-description'>
                <p>
                  {
                    props.pokemonFeatures.otherFeatures
                    .filter(pokemon => parseInt(pokemon.id)===parseInt(props.currentPokemon.id))
                    .map(pokemon=> (
                      pokemon.flavor_text_entries[1].flavor_text
                    ))
                  } 
                </p>
              </div>
              <div className='details-features'>
                <div className='feature'>
                  <h4 className='feature-name'>Height</h4>
                  <p className='feature-value'>{props.currentPokemon.height + 'm'}</p>
                </div>
                <div className='feature'>
                  <h4 className='feature-name'>Weight</h4>
                  <p className='feature-value'>{props.currentPokemon.weight + 'kg'}</p>
                </div>
                <div className='feature'>
                  <h4 className='feature-name'>Gender</h4>
                  <p className='feature-value'>
                    {
                      props.pokemonFeatures.otherFeatures
                      .filter(pokemon => parseInt(pokemon.id)===parseInt(props.currentPokemon.id))
                      .map(pokemon=> (
                        getGender(pokemon.gender_rate)
                      ))
                    }
                  </p>
                </div>
                <div className='feature'>
                  <h4 className='feature-name'>Abilities</h4>
                  <ul className='feature-value' >
                    {props.currentPokemon.abilities.map((ability, index) => (
                    <li key={index} >{ ability.ability.name}</li>
                    ))}
                  </ul>
                </div>
                <div className='feature'>
                  <h4 className='feature-name'>Type</h4>
                  <ul className='feature-value'>
                    {props.currentPokemon.types.map((type, index) => (
                    <li key={index} >{ type.type.name}</li>
                    ))} 
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-chart' >
            <canvas id='myChart'></canvas>
          </div>
          { 
            fillChart(props.currentPokemon.stats)
          }
        </div> : ' '
          }
      </div>
    </div>
    )
}

const mapDispatchToProps = (dispatch) => {
  return {
    compareTo: (id) => dispatch(compareTo(id)),
    restartComparison: () => dispatch(restartComparison())
  }
}

export default connect((state) => {
  return state
}, mapDispatchToProps)(InfoModal)