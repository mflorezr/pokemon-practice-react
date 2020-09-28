import { FETCH_POKEMONS_ERROR, FETCH_POKEMONS_SUCCESS, FETCH_POKEMONS_REQUEST } from '../actions/pokemonListAction'

const initialState = {
  pokemons: [],
  isFetching: false,
  error: null
}

function pokemonsList (state = initialState, action) {
  switch (action.type) {
    case FETCH_POKEMONS_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case FETCH_POKEMONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        pokemons: action.payload.pokemons
      }

    case FETCH_POKEMONS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error
      }

    default:
      return state
  }
}

export default pokemonsList