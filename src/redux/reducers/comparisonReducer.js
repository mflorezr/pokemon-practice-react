import { COMPARE_WITH, RESTART } from '../actions/comparisonActions'

const initialState = []

function comparison (state = initialState, action) {
  switch (action.type) {
    case COMPARE_WITH:
      return  [
        ...state,
        action.payload.id
      ]
      case RESTART:
      return  []
    default:
      return state
  }
}

export default comparison