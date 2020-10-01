import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getGender } from '../Util'
import '../styles/main.css';
import '../styles/modal.css';

const ComparisonFeatures = (props) => {
  const [genderOne, setGenderOne] = useState('Male');
  const [genderTwo, setGenderTwo] = useState('Male');

  useEffect(() => {
    if (props.comparison.length === 2) {
      setGenderOne(props.pokemonFeatures.otherFeatures
        .filter(pokemon => parseInt(pokemon.id) === parseInt(props.comparison[0].id))
        .map(pokemon => (
          getGender(pokemon.gender_rate)
        )))
      setGenderTwo(props.pokemonFeatures.otherFeatures
        .filter(pokemon => parseInt(pokemon.id) === parseInt(props.comparison[1].id))
        .map(pokemon => (
          getGender(pokemon.gender_rate)
        )))
    }
  }, [props.comparison, props.pokemonFeatures]);

  return (
    <div className= 'comparison-features'>
      <div>
        <div className='comparison-feature-value'>
          {props.comparison[0].height + 'm'}
        </div>
        <div className='comparison-feature-value'>
          {props.comparison[0].weight + 'kg'}
        </div>
        <div className='comparison-feature-value'>
          { genderOne }
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
          {props.comparison[1].height + 'm'}
        </div>
        <div className='comparison-feature-value'>
          {props.comparison[1].weight + 'kg'}
        </div>
        <div className='comparison-feature-value'>
          { genderTwo }
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
  );
}

export default connect((state) => {
  return state
})(ComparisonFeatures)