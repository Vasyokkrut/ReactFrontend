const initialState = {
  isDarkTheme: true,
  publicPosts: [],
  isPopUpHidden: true,
  isLoggedIn: false,
  userName: null,
  userPosts: [],
  userJWT: null
}

export const mainReducer = (state = initialState, action) => {
    switch(action.type){
      case 'ACTION_CHANGE_THEME':
        return {...state, isDarkTheme: !state.isDarkTheme}
      case 'ACTION_DELETE_USER_POST':
        return {
          ...state,
          userPosts: state.userPosts.filter(item => item._id !== action.payload._id)
        }
      case 'ACTION_ADD_PUBLIC_POST':
        return {
          ...state,
          publicPosts:[action.payload, ...state.publicPosts]
        }
      case 'ACTION_SET_PUBLIC_POSTS':
        return {
          ...state,
          publicPosts: action.payload
        }
      case 'ACTION_SET_USERPOSTS':
        return {
          ...state,
          userPosts: action.payload
        }
      case 'ACTION_ADD_USER_POST':
        return {
          ...state,
          userPosts: [action.payload, ...state.userPosts]
        }
      case 'ACTION_CHANGE_POPUP_DISPLAY':
        return {
          ...state,
          isPopUpHidden: !state.isPopUpHidden
        }
      case 'ACTION_LOG_IN':
        return {
          ...state,
          isLoggedIn: true,
          userName: action.payload.userName,
          userJWT: action.payload.userJWT
        }
      case 'ACTION_LOG_OUT':
        return {
          ...state,
          isLoggedIn: false,
          userName: null,
          userJWT: null
        }
      default:
        return state
    }
}
