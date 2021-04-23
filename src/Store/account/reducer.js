import { LOG_IN, LOG_OUT } from '../actionTypes.js'

const initialState = {
  userName: null
}

export const accountReducer = (state = initialState, action) => {
  switch(action.type){
    case LOG_IN:
      return {
        userName: action.payload.userName
      }
    case LOG_OUT:
      return {
        userName: null
      }
    default:
      return state
  }
}
