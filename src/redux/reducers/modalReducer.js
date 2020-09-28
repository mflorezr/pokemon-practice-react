import { UPDATE_POKEMON } from '../actions/modalActions'

const initialState = 0

function currentpokemon (state = initialState, action) {
  switch (action.type) {
    case UPDATE_POKEMON:
      return  action.payload.id
      
   
    default:
      return state
  }
}

export default currentpokemon