import { 
  FETCH_FEATURE_ERROR,
  FETCH_FEATURE_SUCCESS,
  FETCH_FEATURE_REQUEST,
  FETCH_OTHERFEATURES_ERROR,
  FETCH_OTHERFEATURES_SUCCESS,
  FETCH_OTHERFEATURES_REQUEST
  } from '../actions/pokemonFeaturesActions'

const initialState = {
  features: [],
  otherFeatures:[],
  error: null,
  isFetching: true,
  isOtherFetching:true
}

function pokemonFeatures (state = initialState, action) {
  switch (action.type) {
    case FETCH_FEATURE_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case FETCH_FEATURE_SUCCESS:
      return {
        ...state,
        features: [...state.features, action.payload.features], 
        isFetching: false
      }

    case FETCH_FEATURE_ERROR:
      return {
        ...state,
        error: action.payload.error, 
        isFetching: false
      }

    case FETCH_OTHERFEATURES_REQUEST:
      return {
        ...state, 
        isOtherFetching: true
      }

    case FETCH_OTHERFEATURES_SUCCESS:
      return {
        ...state,
        otherFeatures: [...state.otherFeatures, action.payload.otherFeatures],
        isOtherFetching: false
      }

    case FETCH_OTHERFEATURES_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isOtherFetching: false
      }

    default:
      return state
  }
}

export default pokemonFeatures