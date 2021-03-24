import React from 'react'
import axios from 'axios'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  setCurrentAudioTrack,
  setIsMusicPlaying,
  setProgressBarWidth,
  deleteAudioTrack
} from '../../Store/actions.js'

function AudioTrack({
  index,
  userJWT,
  userName,
  audioTrack,
  isDarkTheme,
  isMusicPlaying,
  userAudioTracks,
  deleteAudioTrack,
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

  function deleteTrack() {
    const config = {
      headers: {
        'Authorization': 'Bearer ' + userJWT
      },
      data: {
        trackID: audioTrack._id
      }
    }

    axios.delete('/api/deleteUserTrack', config)
      .then(res => {
        deleteAudioTrack({track: audioTrack, trackIndex: index})
      })
      .catch(err => {
        alert(err)
      })
  }

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
        {(isMusicPlaying && audioTrack._id === userAudioTracks[currentAudioTrack]._id) ? 'pause' : 'play'}
      </button>
      <div className='audioplayer-trackitem-title' >{audioTrack.title}</div>
      {
        // if user listening this track then we cannot delete it
        // so we should check is this track the one user listening to
        // otherwise delete button won't appear
        currentAudioTrack !== index
        ?
        <div className='audioplayer-trackitem-delete' onClick={deleteTrack} >&#10006;</div>
        :
        null
      }
    </div>
  )
}

const mapStateToProps = store => {
  return {
    userJWT: store.userJWT,
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
    deleteAudioTrack: bindActionCreators(deleteAudioTrack, dispatch),
    setIsMusicPlaying: bindActionCreators(setIsMusicPlaying, dispatch),
    setProgressBarWidth: bindActionCreators(setProgressBarWidth, dispatch),
    setCurrentAudioTrack: bindActionCreators(setCurrentAudioTrack, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(AudioTrack)
