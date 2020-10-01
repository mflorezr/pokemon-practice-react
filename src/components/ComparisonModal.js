import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import '../styles/main.css'
import '../styles/modal.css';
import ComparisonCard from './ComparisonCard'
import Graph from './Graph';
import { restartComparison } from '../redux/actions/comparisonActions'
import { restartPokemon } from '../redux/actions/modalActions'
import ComparisonFeatures from './ComparisonFeatures';

const ComparisonModal = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [firstImage, setFirstImage] = useState('');
  const [secondImage, setSecondImage] = useState('');

  useEffect(() => {
    if (props.comparison.length === 2) {
      setOpenModal(true);
    }
  }, [props.comparison]);

  useEffect(() => {
    if (props.comparison.length === 2) {
      setFirstImage(props.pokemonFeatures.features
        .filter(pokemon => parseInt(pokemon.id) === parseInt(props.comparison[0].id))
        .map(pokemon => (
          pokemon.sprites.front_default
        )));
      setSecondImage(props.pokemonFeatures.features
        .filter(pokemon => parseInt(pokemon.id) === parseInt(props.comparison[1].id))
        .map(pokemon => (
          pokemon.sprites.front_default
        )));
    }
  }, [props.comparison, props.pokemonFeatures.features]);

  const closeHandler = () => {
    setOpenModal(false);
    props.restartComparison();
    props.restartPokemon();
  }

  return (
    <div className='container'>
      <ComparisonCard />
      <div className={ 'backdrop' + ( openModal ? ' open' : '') } onClick = { closeHandler }></div>
      <div className={ 'modal' + ( openModal ? ' open' : '')} > {
      ((props.comparison.length < 2)) ? '' :
        <div>
          <div className='modal-header'>
            <div className='modal-pokemon-name'>
              {
                props.comparison[0].name.toUpperCase() + ' VS ' + props.comparison[1].name.toUpperCase()
              }
            </div>
            <div className='out-modal' onClick ={ closeHandler } >x</div>
          </div>
          <div className='modal-comparison-images'>
            <div className='comparison-image-container'>
              <img 
                className='comparison-image'
                src={ firstImage }
                alt="pokemon1"/>
            </div>
            <div className='comparison-image-container'>
              <img 
                className='comparison-image'
                src={ secondImage }
                alt="pokemon2"/>
            </div>
          </div>
          <ComparisonFeatures />
          <Graph />
        </div>   
      } 
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    restartComparison: () => dispatch(restartComparison()),
    restartPokemon: () => dispatch(restartPokemon())
  }
}

export default connect((state) => {
  return state
}, mapDispatchToProps)(ComparisonModal)