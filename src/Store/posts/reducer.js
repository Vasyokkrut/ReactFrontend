import {
  ADD_USER_POST,
  SET_USER_POSTS,
  DELETE_USER_POST
} from '../actionTypes.js'

const initialState = {
  userPosts: []
}

export const postsReducer = (state = initialState, action) => {
  switch(action.type){
    case DELETE_USER_POST:
      return {
        ...state,
        userPosts: state.userPosts.filter(item => item._id !== action.payload._id)
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
