import React from 'react'
import '../styles/navBar.css'
import { connect } from 'react-redux'
import { closeModal, getGender } from '../Util'
import '../styles/modal.css';
import Chart from 'chart.js';
import ComparisonCard from './ComparisonCard'

const ComparisonModal = (props) => {

  const closeHandler = () => {
    closeModal(1)
  }

  const createChart = (firstStats, secondStats) => {
    const ctx = document.getElementById('chart-mixed');
    const labels= firstStats.map((stat)=>(
       stat.stat.name
    ))
    const data= firstStats.map((stat)=>(
      stat.base_stat
    ))
    const secondData= secondStats.map((stat)=>(
      stat.base_stat
    ))

    new Chart(ctx, {
      type: 'bar',
      responsive: true , 
      data: {
        datasets: [{
          categoryPercentage:0.8,
          data: data,
          backgroundColor: '#167a69', 
          borderColor: '#167a69',
          borderWidth: 1,
          order: 1
        },
        {
          categoryPercentage:0.8,
          data: secondData,
          backgroundColor: '#26b19c', 
          borderColor: '##26b19c',
          borderWidth: 1,
          order: 2
        }],
        labels: labels
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
              padding: 5,
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

  const fillChart= (firsStats, secondStates)=>{
    setTimeout( () => {
      createChart(firsStats,secondStates)
      },100)
  }

  return(
    <div className='container'>
      <ComparisonCard />
      <div className='backdrop' onClick={closeHandler}></div>
      <div className='modal' > {
      ((props.comparison.length < 2)) ? '' :
        <div>
          <div className='modal-header'>
            <div className='modal-pokemon-name'>
              {
                props.comparison[0].name.toUpperCase() + ' VS ' + props.comparison[1].name.toUpperCase()
              }
            </div>
            <div className='out-modal' onClick={closeHandler} >x</div>
          </div>
          <div className='modal-comparison-images'>
            <div className='comparison-image-container'>
              <img 
                className='comparison-image'
                src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+props.comparison[0].id+'.png'}
                alt="pokemon1"/>
            </div>
            <div className='comparison-image-container'>
              <img 
                className='comparison-image'
                src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+props.comparison[1].id+'.png'}
                alt="pokemon2"/>
            </div>
          </div>
          <div className= 'comparison-features'>
            <div>
              <div className='comparison-feature-value'>
                {props.comparison[0].height+'m'}
              </div>
              <div className='comparison-feature-value'>
                {props.comparison[0].weight+'kg'}
              </div>
              <div className='comparison-feature-value'>
                {
                 props.pokemonFeatures.otherFeatures
                 .filter(pokemon => parseInt(pokemon.id)===parseInt(props.comparison[0].id))
                 .map(pokemon=> (
                     getGender(pokemon.gender_rate)
                   ))
                }
              </div>
              <div>
                {props.comparison[0].abilities.map((ability,index) => (
                <div className='comparison-feature-value' key={index}>
                  {ability.ability.name}
                </div>
                ))}
              </div>         
            </div>
            <div>
              <div className='comparison-feature-name'>Height</div>
              <div className='comparison-feature-name'>Weight</div>
              <div className='comparison-feature-name'>Gender</div>
              <div className='comparison-feature-name'>Abilities</div>
            </div>
            <div>
              <div className='comparison-feature-value'>
                {props.comparison[1].height+'m'}
              </div>
              <div className='comparison-feature-value'>
                {props.comparison[1].weight+'kg'}
              </div>
              <div className='comparison-feature-value'>
                {
                 props.pokemonFeatures.otherFeatures
                 .filter(pokemon => parseInt(pokemon.id)===parseInt(props.comparison[1].id))
                 .map(pokemon=> (
                     getGender(pokemon.gender_rate)
                   ))
                }
              </div>
              <div>
                {props.comparison[1].abilities.map((ability,index) => (
                <div className='comparison-feature-value' key={index}>
                  {ability.ability.name}
                </div>
                ))}
              </div>         
            </div>
          </div>
          <div className='modal-chart-mixed' >
              <canvas id='chart-mixed'></canvas>
          </div>
            {
              fillChart(props.comparison[0].stats,props.comparison[1].stats)
            }
        </div>   
      } 
      </div>
    </div>
   
    )
}

export default connect((state) => {
  return state
})(ComparisonModal)