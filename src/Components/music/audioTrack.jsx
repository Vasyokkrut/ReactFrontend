import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setCurrentAudioTrack, setIsMusicPlaying, setProgressBarWidth } from '../../Store/actions.js'

function AudioTrack({
  index,
  userName,
  audioTrack,
  isDarkTheme,
  isMusicPlaying,
  userAudioTracks,
  currentAudioTrack,
  setIsMusicPlaying,
  currentMusicVolume,
  setProgressBarWidth,
  setCurrentAudioTrack,
}) {

  const buttonClassname = classnames(
    'audioplayer-button',
    isDarkTheme ? 'audioplayer-button-dark' : 'audioplayer-button-light'
  )

  const trackitemClassName = classnames(
    'audioplayer-trackitem',
    isDarkTheme ? 'audioplayer-trackitem-dark' : 'audioplayer-trackitem-light'
  )

  function playpause() {
    const nativeAudioElement = document.getElementById('native-audio-element')

    if (currentAudioTrack === null) {
      nativeAudioElement.src = `/api/getUserTrack/${userName}/${audioTrack._id}`
      nativeAudioElement.volume = currentMusicVolume
      nativeAudioElement.play()
      setCurrentAudioTrack(index)
      return
    }

    if (audioTrack._id === userAudioTracks[currentAudioTrack]._id) {
      if (isMusicPlaying) {
        nativeAudioElement.pause()
        setIsMusicPlaying(false)
      } else {
        nativeAudioElement.play()
        setIsMusicPlaying(true)
      }
    } else {
      nativeAudioElement.pause()
      setProgressBarWidth(0)
      nativeAudioElement.src = `/api/getUserTrack/${userName}/${audioTrack._id}`
      nativeAudioElement.currentTime = 0
      nativeAudioElement.play()
      setCurrentAudioTrack(index)
    }
  }

  return(
    <div className={trackitemClassName} >
      <button className={buttonClassname} onClick={playpause} >
        {(isMusicPlaying && audioTrack._id === userAudioTracks[currentAudioTrack]?._id) ? 'pause' : 'play'}
      </button>
      <div className='audioplayer-trackitem-title' >{audioTrack.title}</div>
    </div>
  )
}

const mapStateToProps = store => {
  return {
    userName: store.userName,
    isDarkTheme: store.isDarkTheme,
    isMusicPlaying: store.isMusicPlaying,
    userAudioTracks: store.userAudioTracks,
    currentAudioTrack: store.currentAudioTrack,
    currentMusicVolume: store.currentMusicVolume
  }
}

const mapActionsToProps = dispatch => {
  return {
    setIsMusicPlaying: bindActionCreators(setIsMusicPlaying, dispatch),
    setCurrentAudioTrack: bindActionCreators(setCurrentAudioTrack, dispatch),
    setProgressBarWidth: bindActionCreators(setProgressBarWidth, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(AudioTrack)
