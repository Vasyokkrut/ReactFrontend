import { CHANGE_THEME, CHANGE_POPUP_DISPLAY } from '../actionTypes.js'

export const changeTheme = () => {
  return {
    type: CHANGE_THEME
  }
}

export const changePopUpDisplay = () => {
  return {
    type: CHANGE_POPUP_DISPLAY
  }
}
