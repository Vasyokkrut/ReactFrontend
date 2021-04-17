import classnames from 'classnames'
import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  setIsMusicPlaying,
  setMusicVolume,
  setProgressBarWidth
} from '../../Store/music/actions.js'

function AudioPlayerControls(props) {

  const buttonClassname = classnames(
    'audioplayer-button',
    props.isDarkTheme ? 'audioplayer-button-dark' : 'audioplayer-button-light'
  )

  const progressBarClassName = classnames(
    'audioplayer-progress-bar',
    props.isDarkTheme ? 'audioplayer-progress-bar-dark' : 'audioplayer-progress-bar-light'
  )

  const progressTimeClassName = classnames(
    'audioplayer-progress-time',
    props.isDarkTheme ? 'audioplayer-progress-time-dark' : 'audioplayer-progress-time-light'
  )

  const volumeBarClassName = classnames(
    'audioplayer-volume-bar',
    props.isDarkTheme ? 'audioplayer-volume-bar-dark' : 'audioplayer-volume-bar-light'
  )
  
  const volumeValueClassName = classnames(
    'audioplayer-volume-value',
    props.isDarkTheme ? 'audioplayer-volume-value-dark' : 'audioplayer-volume-value-light'
  )

  const nativeAudioElement = document.getElementById('native-audio-element')

  const volumeWrapperRef = useRef()
  const progressWrapperRef = useRef()

  function playpause() {
    if (nativeAudioElement.paused) {
      nativeAudioElement.play()
      props.setIsMusicPlaying(true)
    } else {
      nativeAudioElement.pause()
      props.setIsMusicPlaying(false)
    }
  }

  function changeCurrentMusicTime(event) {
    if (props.currentAudioTrack === null) return

    const audioDuration = nativeAudioElement.duration
    const progressOffsetLeft = progressWrapperRef.current.offsetLeft
    const progressOffsetWidth = progressWrapperRef.current.offsetWidth

    const newPosition = (event.pageX - progressOffsetLeft) * audioDuration / progressOffsetWidth

    nativeAudioElement.currentTime = newPosition

    const newWidth = 100 * nativeAudioElement.currentTime / nativeAudioElement.duration
    props.setProgressBarWidth(newWidth)
  }

  function changeMusicVolume(event) {
    const volumeOffsetLeft = volumeWrapperRef.current.offsetLeft
    const volumeOffsetWidth = volumeWrapperRef.current.offsetWidth
    
    const newVolume = (event.pageX - volumeOffsetLeft) / volumeOffsetWidth

    nativeAudioElement.volume = newVolume
    props.setMusicVolume(newVolume)
  }

  return(
    <div className='audioplayer-controls' >

      <button className={buttonClassname} onClick={playpause} disabled={props.currentAudioTrack === null} >
        {props.isMusicPlaying ? 'pause' : 'play'}
      </button>
      
      <div>
        <div className='audioplayer-title' >
          {
            props.currentAudioTrack !== null
            ?
            props.userAudioTracks[props.currentAudioTrack].title
            :
            'please, choose audio track'
          }
        </div>
        <div>
          <div
            ref={progressWrapperRef}
            onClick={changeCurrentMusicTime}
            className='audioplayer-progress-wrapper'
          >
            <div className={progressBarClassName} >
              <div
                className={progressTimeClassName}
                style={{width: props.currentMusicTime + '%'}}
              />
            </div>
          </div>

          <div
            ref={volumeWrapperRef}
            onClick={changeMusicVolume}
            className='audioplayer-volume-wrapper'
          >
            <div className={volumeBarClassName} >
              <div
                className={volumeValueClassName}
                style={{width: props.currentMusicVolume * 100 + '%'}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = store => {
  return {
    isDarkTheme: store.appearance.isDarkTheme,
    isMusicPlaying: store.music.isMusicPlaying,
    userAudioTracks: store.music.userAudioTracks,
    currentMusicTime: store.music.currentMusicTime,
    currentAudioTrack: store.music.currentAudioTrack,
    currentMusicVolume: store.music.currentMusicVolume
  }
}

const mapActionsToProps = dispatch => {
  return {
    setIsMusicPlaying: bindActionCreators(setIsMusicPlaying, dispatch),
    setProgressBarWidth: bindActionCreators(setProgressBarWidth, dispatch),
    setMusicVolume: bindActionCreators(setMusicVolume, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(AudioPlayerControls)
