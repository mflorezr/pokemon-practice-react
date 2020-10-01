import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import '../styles/main.css'
import '../styles/modal.css'
import { compareTo, restartComparison } from '../redux/actions/comparisonActions'
import { restartPokemon } from '../redux/actions/modalActions'
import Graph from './Graph';
import InfoFeatures from './InfoFeatures'

const InfoModal = (props) =>{  
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (props.currentPokemon !== 0 ) {
      setOpenModal(true);
    }
  }, [props.currentPokemon]);

  const compareToHandler = (event) => {
    const current = event.currentTarget.id;
    const id = current.substring(current.indexOf('_') + 1);
    props.compareTo(props.pokemonFeatures.features.filter(pokemon => parseInt(pokemon.id) === parseInt(id))[0]);
    setOpenModal(false);
  }

  const closeHandler = () => {
    setOpenModal(false);
    props.restartPokemon();
  }

  return(
    <div className='container'>
      <div className={'backdrop' + (openModal ? ' open' : '')} onClick={ closeHandler }></div>
      <div className={'modal' + (openModal ? ' open' : '') } >
        { props.currentPokemon !==0 ?  
        <div>
          <div className='modal-header'>
            <div className='modal-header-items'>
              <div className='modal-pokemon-name'>
                { props.currentPokemon.name.toUpperCase() }
              </div>
              <button id={ props.currentPokemon.name + '_' + props.currentPokemon.id } className='compare-button' onClick= { compareToHandler }>Compare to...</button>
            </div>
            <div className='out-modal' onClick={ closeHandler }>x</div>
          </div>
          <InfoFeatures />
          <Graph/>
        </div> : ' '
          }
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    compareTo: (id) => dispatch(compareTo(id)),
    restartComparison: () => dispatch(restartComparison()),
    restartPokemon: () => dispatch(restartPokemon())
  }
}

export default connect((state) => {
  return state
}, mapDispatchToProps)(InfoModal)