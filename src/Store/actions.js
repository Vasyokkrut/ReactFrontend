export const changeTheme = () => {
  return {
    type:'ACTION_CHANGE_THEME'
  }
}

export const deletePost = (pictureName) => {
  return {
    type:'ACTION_DELETE_PICTURE',
    payload:{
      _id:pictureName
    }
  }
}

export const deleteUserPost = (pictureName) => {
  return {
    type:'ACTION_DELETE_USER_PICTURE',
    payload:{
      _id:pictureName
    }
  }
}

export const addUserPost = (newPost) => {
  return {
    type:'ACTION_ADD_USER_POST',
    payload:newPost
  }
}

export const addPost = (newPost) => {
  return {
    type:'ACTION_ADD_POST',
    payload:newPost
  }
}

export const changePopUpDisplay = () => {
  return {
    type:'ACTION_CHANGE_POPUP_DISPLAY'
  }
}

export const userLogin = user => {
  return {
    type:'ACTION_LOG_IN',
    payload:user
  }
}

export const userLogout = () => {
  return {
    type:'ACTION_LOG_OUT'
  }
}
