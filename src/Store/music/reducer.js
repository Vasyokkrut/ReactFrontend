import {
  SET_CURRENT_MUSIC_VOLUME,
  SET_CURRENT_AUDIO_TRACK,
  SET_PROGRESS_BAR_WIDTH,
  SET_USER_AUDIO_TRACKS,
  SET_IS_MUSIC_PLAYING,
  SET_NEXT_AUDIO_TRACK,
  DELETE_AUDIO_TRACK,
  RESET_AUDIO_PLAYER,
  ADD_AUDIO_TRACK,
  STOP_MUSIC
} from '../actionTypes.js'

const initialState = {
  currentMusicTime: 0,
  isMusicPlaying: false,
  currentAudioTrack: null,
  currentMusicVolume: .1,
  userAudioTracks: null
}

export const musicReducer = (state = initialState, action) => {
  switch(action.type){
    case STOP_MUSIC:
      return {
        ...state,
        currentMusicTime: 0,
        isMusicPlaying: false,
        currentAudioTrack: null
      }
    case SET_CURRENT_AUDIO_TRACK:
      return {
        ...state,
        isMusicPlaying: true,
        currentAudioTrack: action.payload
      }
    case DELETE_AUDIO_TRACK:
      const newUserAudioTracks = state.userAudioTracks.filter(track => track._id !== action.payload.track._id)
      if (state.currentAudioTrack !== null && action.payload.trackIndex < state.currentAudioTrack) {
        return {
          ...state,
          userAudioTracks: newUserAudioTracks,
          currentAudioTrack: state.currentAudioTrack - 1
        }
      } else {
        return {
          ...state,
          userAudioTracks: newUserAudioTracks
        }
      }
    case ADD_AUDIO_TRACK:
      if (state.isMusicPlaying) {
        return {
          ...state,
          currentAudioTrack: state.currentAudioTrack + 1,
          userAudioTracks: [action.payload, ...state.userAudioTracks]
        }
      } else {
        return {
          ...state,
          userAudioTracks: [action.payload, ...state.userAudioTracks]
        }
      }
    case SET_IS_MUSIC_PLAYING:
      return {
        ...state,
        isMusicPlaying: action.payload
      }
    case SET_CURRENT_MUSIC_VOLUME:
      return {
        ...state,
        currentMusicVolume: action.payload
      }
    case SET_PROGRESS_BAR_WIDTH:
      return {
        ...state,
        currentMusicTime: action.payload
      }
    case SET_USER_AUDIO_TRACKS:
      return {
        ...state,
        userAudioTracks: action.payload
      }
    case SET_NEXT_AUDIO_TRACK:
      return {
        ...state,
        currentMusicTime: 0,
        currentAudioTrack: state.currentAudioTrack + 1
      }
    case RESET_AUDIO_PLAYER:
      return {
        ...state,
        userAudioTracks: null,
        currentMusicTime: 0,
        isMusicPlaying: false,
        currentAudioTrack: null
      }
    default:
      return state
  }
}
