export const FETCH_POKEMONS_REQUEST = 'FETCH_POKEMONS_REQUEST'
export const FETCH_POKEMONS_SUCCESS = 'FETCH_POKEMONS_SUCCESS'
export const FETCH_POKEMONS_ERROR = 'FETCH_POKEMONS_ERROR'

export const fetchPokemons = (limit) => (dispatch) => {
  dispatch({ type: FETCH_POKEMONS_REQUEST })
  fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${limit}`)
    .then(res => res.json())
    .then(pokemons => {
      dispatch({
        type: FETCH_POKEMONS_SUCCESS,
        payload: {
          pokemons: pokemons.results
        }
      })
    })
    .catch(error => {
      dispatch({
        type: FETCH_POKEMONS_ERROR,
        error: error.toString()
      })
    })
}