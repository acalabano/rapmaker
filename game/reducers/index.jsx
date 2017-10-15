import {combineReducers} from 'redux'

const reducer = combineReducers({
  game: require('./game').default,
  pixel: require('./pixel').default,
  task: require('./task').default,
  words: require('./words').default
})

// This is a custom combineReducers function that first passes
// the action to the players reducer only. Then it passes actions to the board
// and boundary reducers only if the current player does not have an error.
export default reducer
