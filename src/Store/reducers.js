const initialState = {
  currentMusicTime: 0,
  isMusicPlaying: false,
  currentAudioTrack: null,
  currentMusicVolume: .01,
  userAudioTracks: [],
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
      case 'ACTION_SET_CURRENT_AUDIO_TRACK':
        return {
          ...state,
          isMusicPlaying: true,
          currentAudioTrack: action.payload
        }
      case 'ACTION_DELETE_AUDIO_TRACK':
        const newUserAudioTracks = state.userAudioTracks.filter(track => track._id !== action.payload.track._id)
        let newCurrentAudioTrack = state.currentAudioTrack
        if (action.payload.trackIndex < state.currentAudioTrack) newCurrentAudioTrack--
        return {
          ...state,
          userAudioTracks: newUserAudioTracks,
          currentAudioTrack: newCurrentAudioTrack
        }
      case 'ACTION_ADD_AUDIO_TRACK':
        console.log([...state.userAudioTracks, action.payload])
        return {
          ...state,
          userAudioTracks: [...state.userAudioTracks, action.payload]
        }
      case 'ACTION_SET_IS_MUSIC_PLAYING':
        return {
          ...state,
          isMusicPlaying: action.payload
        }
      case 'ACTION_SET_CURRENT_MUSIC_VOLUME':
        return {
          ...state,
          currentMusicVolume: action.payload
        }
      case 'ACTION_SET_PROGRESS_BAR_WIDTH':
        return {
          ...state,
          currentMusicTime: action.payload
        }
      case 'ACTION_SET_USER_AUDIO_TRACKS':
        return {
          ...state,
          userAudioTracks: action.payload
        }
      case 'ACTION_SET_NEXT_AUDIO_TRACK':
        return {
          ...state,
          currentMusicTime: 0,
          currentAudioTrack: state.currentAudioTrack + 1
        }
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
