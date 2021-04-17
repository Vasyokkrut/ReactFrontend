import { LOG_IN, LOG_OUT } from '../actionTypes.js'

const initialState = {
  isLoggedIn: false,
  userName: null,
  userJWT: null
}

export const accountReducer = (state = initialState, action) => {
  switch(action.type){
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        userName: action.payload.userName,
        userJWT: action.payload.userJWT
      }
    case LOG_OUT:
      return {
        ...state,
        userJWT: null,
        userName: null,
        isLoggedIn: false
      }
    default:
      return state
  }
}
