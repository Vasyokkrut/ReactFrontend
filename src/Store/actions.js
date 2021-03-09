export const changeTheme = () => {
  return {
    type: 'ACTION_CHANGE_THEME'
  }
}

export const deleteUserPost = postId => {
  return {
    type: 'ACTION_DELETE_USER_POST',
    payload: {
      _id: postId
    }
  }
}

export const setUserPosts = posts => {
  return {
    type: 'ACTION_SET_USERPOSTS',
    payload: posts
  }
}

export const setPublicPosts = posts => {
  return {
    type: 'ACTION_SET_PUBLIC_POSTS',
    payload: posts
  }
}

export const addUserPost = newPost => {
  return {
    type: 'ACTION_ADD_USER_POST',
    payload: newPost
  }
}

export const addPublicPost = newPost => {
  return {
    type: 'ACTION_ADD_PUBLIC_POST',
    payload: newPost
  }
}

export const changePopUpDisplay = () => {
  return {
    type: 'ACTION_CHANGE_POPUP_DISPLAY'
  }
}

export const userLogin = user => {
  return {
    type: 'ACTION_LOG_IN',
    payload: user
  }
}

export const userLogout = () => {
  return {
    type: 'ACTION_LOG_OUT'
  }
}
