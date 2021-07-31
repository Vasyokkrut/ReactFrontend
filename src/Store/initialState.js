const initialState = {
  music: {
    currentMusicTime: 0,
    isMusicPlaying: false,
    currentAudioTrack: null,
    currentMusicVolume: .1,
    userAudioTracks: null
  },
  posts: {
    userPosts: []
  },
  account: {
    userName: null
  },
  appearance: {
    isDarkTheme: true,
    isPopUpHidden: true
  }
}

if (localStorage.getItem('isDarkTheme') === 'false') {
  initialState.appearance.isDarkTheme = false
}

const userName = localStorage.getItem('userName')
if (userName) initialState.account.userName = userName

const mobileDeviceNames = [
  /android/i,
  /iphone/i,
  /ipad/i,
  /ipod/i,
  /windows phone/i,
  /blackberry/i,
  /tablet/i,
  /touch/i
]
const isMobileDevice = navigator.userAgentData?.mobile ?? mobileDeviceNames.some(item => {
  return navigator.userAgent.match(item)
})
// if user have mobile device, native audio element should use maximum volume
// otherwise native audio element will use value from localstorage
if (isMobileDevice) {
  initialState.music.currentMusicVolume = 1
} else {
  const musicVolume = localStorage.getItem('musicVolume')
  if (musicVolume !== null) initialState.music.currentMusicVolume = +musicVolume
}

export default initialState
