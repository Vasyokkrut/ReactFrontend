import { connect } from 'react-redux'
import React, { useRef } from 'react'
import { bindActionCreators } from 'redux'

import {
  setProgressBarWidth,
  setNextAudioTrack,
  setIsMusicPlaying
} from '../../Store/music/actions.js'

function NativeAudioElement({
  userName,
  userAudioTracks,
  currentAudioTrack,
  setNextAudioTrack,
  setIsMusicPlaying,
  setProgressBarWidth
}) {

  const audioPlayerRef = useRef()

  function setMusicTime() {
    // this will be the value in range from 0 to 100 for progress bar width 
    const newWidth = 100 * audioPlayerRef.current.currentTime / audioPlayerRef.current.duration
    setProgressBarWidth(newWidth)
  }

  function setNextTrack() {
    audioPlayerRef.current.pause()
    
    if (currentAudioTrack < userAudioTracks.length - 1) {
      const nextAudioTrack = userAudioTracks[currentAudioTrack + 1]
      audioPlayerRef.current.currentTime = 0
      audioPlayerRef.current.src = `/api/music/getAudioTrack/${userName}/${nextAudioTrack._id}`
      audioPlayerRef.current.play()
      setNextAudioTrack()
    } else {
      setIsMusicPlaying(false)
    }
  }

  if (!userName) return null

  return(
    <audio
      ref={audioPlayerRef}
      onEnded={setNextTrack}
      id='native-audio-element'
      onTimeUpdate={setMusicTime}
    />
  )
}

const mapStateToProps = store => {
  return {
    userName: store.account.userName,
    userAudioTracks: store.music.userAudioTracks,
    currentAudioTrack: store.music.currentAudioTrack
  }
}

const mapActionsToProps = dispatch => {
  return {
    setIsMusicPlaying: bindActionCreators(setIsMusicPlaying, dispatch),
    setNextAudioTrack: bindActionCreators(setNextAudioTrack, dispatch),
    setProgressBarWidth: bindActionCreators(setProgressBarWidth, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(NativeAudioElement)
