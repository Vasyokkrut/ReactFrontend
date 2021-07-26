import { combineReducers, createStore } from 'redux'

import initialState from './initialState.js'
import { musicReducer } from './music/reducer.js'
import { postsReducer } from './posts/reducer.js'
import { accountReducer } from './account/reducer.js'
import { appearanceReducer } from './appearance/reducer.js'

const rootReducer = combineReducers({
  music: musicReducer,
  posts: postsReducer,
  account: accountReducer,
  appearance: appearanceReducer
})

const store = createStore(rootReducer, initialState)

export default store
