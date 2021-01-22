import reducer from './reducers/anecdoteReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore } from 'redux'

const store = createStore(reducer, composeWithDevTools())

export default store