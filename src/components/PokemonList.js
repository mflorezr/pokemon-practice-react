/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { fetchPokemons } from '../redux/actions/pokemonListAction'
import { fetchFeatures, fetchOthers } from '../redux/actions/pokemonFeaturesActions'
import { updatePokemon} from '../redux/actions/modalActions'
import { compareTo } from '../redux/actions/comparisonActions'
import { activeModal, closeComparisonCard } from '../Util'
import '../styles/pokemonList.css'


const PokemonList = (props) =>{  
  let srcImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
  const [isScrolled, setIsScrolled] = useState(false);
  const [id, setId] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    props.fetchPokemons(20)
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener( 'scroll', scrollHandler)
    }
  }, []);

  useEffect(() => {
		if (isScrolled){
      const listSize=props.pokemonList.pokemons.length
      props.fetchPokemons(listSize+20)
      setIsScrolled(false)
    }
  }, [isScrolled]);
  
  useEffect(() => {
    if(!props.pokemonFeatures.isFetching && !props.pokemonFeatures.isOtherFetching && isClicked){
      actionToDo(id)
      setIsClicked(false)
    }
	}, [props.pokemonFeatures.isFetching, props.pokemonFeatures.isOtherFetching]);

  const scrollHandler = () => {
    if(Math.ceil(window.innerHeight + document.documentElement.scrollTop) === document.documentElement.offsetHeight){
      setIsScrolled(true)
    }
  }

  const isVisible = () => {
    const comparisonCard = document.getElementsByClassName('comparison-card')[0]
    return comparisonCard.classList.contains('open-comparison')
  }

  const actionToDo = (cardId) =>{
    const pokemonSelected = props.pokemonFeatures.features.filter(pokemon => parseInt(pokemon.id)===parseInt(cardId))[0]
    if(isVisible()){
      props.compareTo(pokemonSelected)
      activeModal(1)
      closeComparisonCard()
    } else{
      props.updatePokemon(pokemonSelected)
      activeModal(0)
    } 
  }

  const pokemonClickHandler = (e) => {
    const pokemonId = e.currentTarget.id
    setId(pokemonId)
    setIsClicked(true)
    let pokemonExists = props.pokemonFeatures.features.filter(pokemon => parseInt(pokemonId)===parseInt(pokemon.id))
    if(pokemonExists.length === 0) { 
      props.fetchFeatures(props.pokemonList.pokemons[pokemonId-1].url)
      props.fetchOthers(pokemonId)
    } else {
      actionToDo(pokemonId)
    }
  }

  return(
    <div className = 'pokemon-list' onScroll={scrollHandler}>
      {props.pokemonList.pokemons.map((pokemon, index) => (
        <div id={index+1} className='pokemon-card' key={pokemon.url} onClick={pokemonClickHandler}>
          <div className='pokemon-image-container'>
            <img className='pokemon-image' 
              src = { 
                    srcImage + pokemon.url.substring(34, pokemon.url.length - 1) +'.png'
                }  
              alt={pokemon.name}
            />
          </div>
          <div className = 'pokemon-name'>
            { pokemon.name.toUpperCase() } 
          </div> 
        </div>
      ))}
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPokemons: (limit) => dispatch(fetchPokemons(limit)),
    fetchFeatures: (url) => dispatch(fetchFeatures(url)),
    fetchOthers: (id) => dispatch(fetchOthers(id)),
    updatePokemon: (id) => dispatch(updatePokemon(id)),
    compareTo: (id) => dispatch(compareTo(id))
  }
}

export default connect((state) => {
  return state
}, mapDispatchToProps)(PokemonList)