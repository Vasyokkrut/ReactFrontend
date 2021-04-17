import { LOG_IN, LOG_OUT } from '../actionTypes.js'

export const userLogin = user => {
  return {
    type: LOG_IN,
    payload: user
  }
}

export const userLogout = () => {
  return {
    type: LOG_OUT
  }
}
