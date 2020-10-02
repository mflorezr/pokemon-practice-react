export const FETCH_FEATURE_REQUEST = 'FETCH_FEATURE_REQUEST'
export const FETCH_FEATURE_SUCCESS = 'FETCH_FEATURE_SUCCESS'
export const FETCH_FEATURE_ERROR = 'FETCH_FEATURE_ERROR'
export const FETCH_OTHERFEATURES_REQUEST = 'FETCH_OTHERFEATURES_REQUEST'
export const FETCH_OTHERFEATURES_SUCCESS = 'FETCH_OTHERFEATURES_SUCCESS'
export const FETCH_OTHERFEATURES_ERROR = 'FETCH_OTHERFEATURES_ERROR'

export const fetchFeatures = (url) => (dispatch) => {
  dispatch({ type: FETCH_FEATURE_REQUEST })
  fetch(url)
    .then(res => res.json())
    .then(pokemon => {
      dispatch({
        type: FETCH_FEATURE_SUCCESS,
        payload: {
          features: pokemon
        }
      })
    })
    .catch(error => {
      dispatch({
        type: FETCH_FEATURE_ERROR,
        error: error.toString()
      })
    })
}

export const fetchOthers = (id) => (dispatch) => {
  dispatch({ type: FETCH_OTHERFEATURES_REQUEST })
  fetch('https://pokeapi.co/api/v2/pokemon-species/'+id)
    .then(res => res.json())
    .then(pokemon => {
      dispatch({
        type: FETCH_OTHERFEATURES_SUCCESS,
        payload: {
          otherFeatures: pokemon
        }
      })
    })
    .catch(error => {
      dispatch({
        type: FETCH_OTHERFEATURES_ERROR,
        error: error.toString()
      })
    })
}
