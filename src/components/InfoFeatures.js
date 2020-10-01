import React, { useEffect, useState }from 'react'
import { connect } from 'react-redux'
import { getGender } from '../Util'
import '../styles/main.css'
import '../styles/modal.css';

const InfoFeatures = (props) => {
  const [gender, setGender] = useState('Male');
  const [description, setDescription] = useState(' ');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (props.currentPokemon !== 0) {
      setDescription(props.pokemonFeatures.otherFeatures
        .filter(pokemon => parseInt(pokemon.id) === parseInt(props.currentPokemon.id))
        .map(pokemon=> (
          pokemon.flavor_text_entries[1].flavor_text
        )));
      setGender(props.pokemonFeatures.otherFeatures
        .filter(pokemon => parseInt(pokemon.id) === parseInt(props.currentPokemon.id))
        .map(pokemon=> (
          getGender(pokemon.gender_rate)
        )));
      setImage(props.pokemonFeatures.features
        .filter(pokemon => parseInt(pokemon.id) === parseInt(props.currentPokemon.id))
        .map(pokemon=> (
          pokemon.sprites.front_default
        )));
    }
  }, [props.currentPokemon, props.pokemonFeatures]);

  return (
    <div className='modal-body'>
      <div className='modal-image-container'>
        <img className='modal-image' 
        src={ image }
        alt={ props.currentPokemon.name } 
        />
      </div>
      <div className='modal-pokemon-details'>
        <div className='details-description'>
          <p>
            { description } 
          </p>
        </div>
        <div className='details-features'>
          <div className='feature'>
            <h4 className='feature-name'>Height</h4>
            <p className='feature-value'>{ props.currentPokemon.height + 'm' }</p>
          </div>
          <div className='feature'>
            <h4 className='feature-name'>Weight</h4>
            <p className='feature-value'>{ props.currentPokemon.weight + 'kg' }</p>
          </div>
          <div className='feature'>
            <h4 className='feature-name'>Gender</h4>
            <p className='feature-value'>
              { gender }
            </p>
          </div>
          <div className='feature'>
            <h4 className='feature-name'>Abilities</h4>
            <ul className='feature-value' >
              { props.currentPokemon.abilities.map((ability, index) => (
                  <li key={ index } >{ ability.ability.name }</li>
                )) }
            </ul>
          </div>
          <div className='feature'>
            <h4 className='feature-name'>Type</h4>
            <ul className='feature-value'>
              { props.currentPokemon.types.map((type, index) => (
                  <li key={ index } >{ type.type.name }</li>
                )) } 
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect((state) => {
  return state
})(InfoFeatures)