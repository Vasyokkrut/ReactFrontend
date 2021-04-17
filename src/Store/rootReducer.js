import { combineReducers } from 'redux'

import { musicReducer } from './music/reducer.js'
import { postsReducer } from './posts/reducer.js'
import { accountReducer } from './account/reducer.js'
import { appearanceReducer } from './appearance/reducer.js'

export const rootReducer = combineReducers({
  music: musicReducer,
  posts: postsReducer,
  account: accountReducer,
  appearance: appearanceReducer
})
