import { LOOK_FOR } from '../actions/lookForActions'

const initialState = []

function lookFor (state = initialState, action) {
  switch (action.type) {
    case LOOK_FOR:
      return action.payload.pokemonResults
    default:
      return state
  }
}

export default lookFor