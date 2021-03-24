export const deleteAudioTrack = data => {
  return {
    type: 'ACTION_DELETE_AUDIO_TRACK',
    payload: data
  }
}

export const addAudioTrack = track => {
  return {
    type: 'ACTION_ADD_AUDIO_TRACK',
    payload: track
  }
}

export const setIsMusicPlaying = value => {
  return {
    type: 'ACTION_SET_IS_MUSIC_PLAYING',
    payload: value
  }
}

export const setCurrentAudioTrack = track => {
  return {
    type: 'ACTION_SET_CURRENT_AUDIO_TRACK',
    payload: track
  }
}

export const setProgressBarWidth = time => {
  return {
    type: 'ACTION_SET_PROGRESS_BAR_WIDTH',
    payload: time
  }
}

export const setMusicVolume = value => {
  return {
    type: 'ACTION_SET_CURRENT_MUSIC_VOLUME',
    payload: value
  }
}

export const setUserAudioTracks = audioTracks => {
  return {
    type: 'ACTION_SET_USER_AUDIO_TRACKS',
    payload: audioTracks
  }
}

export const setNextAudioTrack = () => {
  return {
    type: 'ACTION_SET_NEXT_AUDIO_TRACK'
  }
}

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
