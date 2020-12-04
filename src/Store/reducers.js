let initialState = {
  theme: 'dark',
  posts: [],
  popUpHidden: true,
  isLoggedin: false,
  userName: null,
  userPosts: [],
  userJWTToken: null
}

export const mainReducer = (state=initialState, action) => {
    switch(action.type){
      case 'ACTION_CHANGE_THEME':
        return {...state, theme: state.theme==='dark' ? 'light': 'dark'}
      case 'ACTION_DELETE_PICTURE':
        return {
          ...state,
          posts:state.posts.filter( item => item._id!==action.payload._id )
        }
      case 'ACTION_DELETE_USER_PICTURE':
        return {
          ...state,
          userPosts:state.userPosts.filter( item => item._id!==action.payload._id )
        }
      case 'ACTION_ADD_POST':
        return {
          ...state,
          posts:[action.payload, ...state.posts]
        }
      case 'ACTION_ADD_USER_POST':
        return {
          ...state,
          userPosts:[action.payload, ...state.userPosts]
        }
      case 'ACTION_CHANGE_POPUP_DISPLAY':
        return {
          ...state,
          popUpHidden:!state.popUpHidden
        }
      case 'ACTION_LOG_IN':
        return {
          ...state,
          isLoggedin:true,
          userName:action.payload.username,
          userJWTToken:action.payload.JWTToken
        }
      case 'ACTION_LOG_OUT':
        return {
          ...state,
          isLoggedin:false,
          userName:null,
          userPosts:[],
          userJWTToken:null
        }
      default:
        return state
    }
}