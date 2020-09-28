import { createStore, applyMiddleware } from "redux";
import root from './reducers/index' 
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const store = createStore(
  root,  applyMiddleware(logger, thunk)
)

export default store