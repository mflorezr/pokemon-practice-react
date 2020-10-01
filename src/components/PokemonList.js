
import React, { useState, useEffect, useCallback} from 'react'
import { connect } from 'react-redux'
import { fetchPokemons } from '../redux/actions/pokemonListAction'
import { fetchFeatures, fetchOthers } from '../redux/actions/pokemonFeaturesActions'
import { updatePokemon} from '../redux/actions/modalActions'
import { compareTo } from '../redux/actions/comparisonActions'
import '../styles/main.css'
import '../styles/pokemonList.css'

const PokemonList = (props) =>{  
  let srcImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [id, setId] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [pokemonToShow, setPokemonToShow] = useState([]);
  const {
    fetchPokemons, 
    pokemonFeatures,
    compareTo, 
    updatePokemon, 
    pokemonList,
    comparison,
    fetchFeatures,
    fetchOthers,
    pokemonResults
  } = props;

  useEffect(() => {
    fetchPokemons(20);
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener( 'scroll', scrollHandler);
    }
  }, [fetchPokemons]);

  useEffect(() => {
    setPokemonToShow(pokemonResults);
  }, [pokemonResults]);

  useEffect(() => {
    if (isScrolled) {
      const listSize = pokemonList.pokemons.length;
      fetchPokemons(listSize + 20);
      setIsScrolled(false);
    }
  }, [fetchPokemons, isScrolled, pokemonList.pokemons]);
  
  const actionToDo = useCallback((cardId) => {
    const pokemonSelected = pokemonFeatures.features.filter(pokemon => parseInt(pokemon.id) === parseInt(cardId))[0];
    if (comparison.length === 1) {
      compareTo(pokemonSelected);
    } else {
      updatePokemon(pokemonSelected);
    } 
  },[compareTo, updatePokemon, comparison.length, pokemonFeatures.features])
  
  useEffect(() => {
    if (!pokemonFeatures.isFetching && !pokemonFeatures.isOtherFetching && isClicked) {
      actionToDo(id);
      setIsClicked(false);
    }
	}, [pokemonFeatures.isFetching, pokemonFeatures.isOtherFetching, isClicked, id, actionToDo]);

  const scrollHandler = () => {
    if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) === document.documentElement.offsetHeight) {
      setIsScrolled(true);
    }
  }

  const pokemonClickHandler = (event) => {
    const pokemonId = event.currentTarget.id;
    setId(pokemonId);
    let pokemonExists = pokemonFeatures.features.filter(pokemon => parseInt(pokemonId) === parseInt(pokemon.id));
    if (pokemonExists.length === 0) { 
      fetchFeatures(pokemonList.pokemons[pokemonId - 1].url);
      fetchOthers(pokemonId);
      setIsClicked(true);
    } else {
      actionToDo(pokemonId);
    }
  }

  return(
    <div className = 'pokemon-list' onScroll={scrollHandler}>
      {pokemonToShow.map((pokemon) => (
        <div id={pokemon.url.substring(34, pokemon.url.length - 1)} className='pokemon-card' key={pokemon.url} onClick={pokemonClickHandler}>
          <div className='pokemon-image-container'>
            <img className='pokemon-image' 
              src = { 
                    srcImage + pokemon.url.substring(34, pokemon.url.length - 1) + '.png'
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
  );
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