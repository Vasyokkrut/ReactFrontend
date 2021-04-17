import {
  ADD_USER_POST,
  SET_USER_POSTS,
  ADD_PUBLIC_POST,
  SET_PUBLIC_POSTS,
  DELETE_USER_POST
} from '../actionTypes.js'

const initialState = {
  userPosts: [],
  publicPosts: []
}

export const postsReducer = (state = initialState, action) => {
  switch(action.type){
    case DELETE_USER_POST:
      return {
        ...state,
        userPosts: state.userPosts.filter(item => item._id !== action.payload._id)
      }
    case ADD_PUBLIC_POST:
      return {
        ...state,
        publicPosts:[action.payload, ...state.publicPosts]
      }
    case SET_PUBLIC_POSTS:
      return {
        ...state,
        publicPosts: action.payload
      }
    case SET_USER_POSTS:
      return {
        ...state,
        userPosts: action.payload
      }
    case ADD_USER_POST:
      return {
        ...state,
        userPosts: [action.payload, ...state.userPosts]
      }
    default:
      return state
  }
}
