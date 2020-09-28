import { combineReducers } from 'redux'
import pokemonList from './pokemonListReducer'
import pokemonFeatures from './pokemonFeaturesReducer'
import currentPokemon from './modalReducer'
import comparison from './comparisonReducer'

export default combineReducers({
  pokemonList,
  pokemonFeatures,
  currentPokemon,
  comparison
})