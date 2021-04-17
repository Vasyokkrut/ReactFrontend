import { CHANGE_THEME, CHANGE_POPUP_DISPLAY } from '../actionTypes.js'

const initialState = {
  isDarkTheme: true,
  isPopUpHidden: true
}

export const appearanceReducer = (state = initialState, action) => {
  switch(action.type){
    case CHANGE_THEME:
      return {...state, isDarkTheme: !state.isDarkTheme}
    case CHANGE_POPUP_DISPLAY:
      return {
        ...state,
        isPopUpHidden: !state.isPopUpHidden
      }
    default:
      return state
  }
}
