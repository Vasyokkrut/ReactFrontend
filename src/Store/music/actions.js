import {
  SET_CURRENT_MUSIC_VOLUME,
  SET_CURRENT_AUDIO_TRACK,
  SET_PROGRESS_BAR_WIDTH,
  SET_USER_AUDIO_TRACKS,
  SET_IS_MUSIC_PLAYING,
  SET_NEXT_AUDIO_TRACK,
  DELETE_AUDIO_TRACK,
  RESET_AUDIO_PLAYER,
  ADD_AUDIO_TRACK
} from '../actionTypes.js'

export const deleteAudioTrack = data => {
  return {
    type: DELETE_AUDIO_TRACK,
    payload: data
  }
}

export const addAudioTrack = track => {
  return {
    type: ADD_AUDIO_TRACK,
    payload: track
  }
}

export const setIsMusicPlaying = value => {
  return {
    type: SET_IS_MUSIC_PLAYING,
    payload: value
  }
}

export const setCurrentAudioTrack = track => {
  return {
    type: SET_CURRENT_AUDIO_TRACK,
    payload: track
  }
}

export const setProgressBarWidth = time => {
  return {
    type: SET_PROGRESS_BAR_WIDTH,
    payload: time
  }
}

export const setMusicVolume = value => {
  return {
    type: SET_CURRENT_MUSIC_VOLUME,
    payload: value
  }
}

export const setUserAudioTracks = audioTracks => {
  return {
    type: SET_USER_AUDIO_TRACKS,
    payload: audioTracks
  }
}

export const setNextAudioTrack = () => {
  return {
    type: SET_NEXT_AUDIO_TRACK
  }
}

export const resetAudioPlayer = () => {
  return {
    type: RESET_AUDIO_PLAYER
  }
}
