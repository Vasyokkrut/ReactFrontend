import {
  ADD_USER_POST,
  SET_USER_POSTS,
  ADD_PUBLIC_POST,
  SET_PUBLIC_POSTS,
  DELETE_USER_POST
} from '../actionTypes.js'

export const deleteUserPost = postId => {
  return {
    type: DELETE_USER_POST,
    payload: {
      _id: postId
    }
  }
}

export const setUserPosts = posts => {
  return {
    type: SET_USER_POSTS,
    payload: posts
  }
}

export const setPublicPosts = posts => {
  return {
    type: SET_PUBLIC_POSTS,
    payload: posts
  }
}

export const addUserPost = newPost => {
  return {
    type: ADD_USER_POST,
    payload: newPost
  }
}

export const addPublicPost = newPost => {
  return {
    type: ADD_PUBLIC_POST,
    payload: newPost
  }
}
