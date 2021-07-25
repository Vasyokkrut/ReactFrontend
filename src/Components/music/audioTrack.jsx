import axios from 'axios'
import { useRef } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { userLogout } from '../../Store/account/actions.js'
import { changePopUpDisplay } from '../../Store/appearance/actions.js'
import {
  deleteAudioTrack,
  setIsMusicPlaying,
  setProgressBarWidth,
  setCurrentAudioTrack
} from '../../Store/music/actions.js'

function AudioTrack({
  index,
  userName,
  userLogout,
  audioTrack,
  isDarkTheme,
  isMusicPlaying,
  userAudioTracks,
  deleteAudioTrack,
  currentMusicTime,
  currentAudioTrack,
  setIsMusicPlaying,
  currentMusicVolume,
  changePopUpDisplay,
  setProgressBarWidth,
  setCurrentAudioTrack,
}) {
  const trackitemRef = useRef()
  const progressWrapperRef = useRef()

  const buttonClassname = classnames(
    'audioplayer-button',
    isDarkTheme ? 'trackitem-button-dark' : 'trackitem-button-light'
  )

  const trackitemClassName = classnames(
    'trackitem',
    isDarkTheme ? 'trackitem-dark' : 'trackitem-light'
  )

  const trackitemBarClassName = classnames(
    'trackitem-progress-bar',
    isDarkTheme ? 'trackitem-progress-bar-dark' : 'trackitem-progress-bar-light'
  )

  const trackitemTimeClassName = classnames(
    'trackitem-progress-time',
    isDarkTheme ? 'trackitem-progress-time-dark' : 'trackitem-progress-time-light'
  )

  const deleteSignClassName = classnames(
    'trackitem-delete',
    isDarkTheme ? 'trackitem-delete-dark' : 'trackitem-delete-light'
  )

  function deleteTrack() {
    const config = {
      data: {
        trackID: audioTrack._id
      }
    }

    axios.delete('/api/music/deleteAudioTrack', config)
      .then(res => deleteAudioTrack({track: audioTrack, trackIndex: index}))
      .catch(err => {
        const status = err.response.status
        if (status === 401 || status === 403) {
          localStorage.removeItem('userName')
          userLogout()
          changePopUpDisplay()
        } else {
          alert('error happened :(')
        }
      })
  }

  function playpause() {
    const nativeAudioElement = document.getElementById('native-audio-element')

    if (currentAudioTrack === null) {
      nativeAudioElement.src = `/api/music/getAudioTrack/${userName}/${audioTrack._id}`
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
      nativeAudioElement.src = `/api/music/getAudioTrack/${userName}/${audioTrack._id}`
      nativeAudioElement.currentTime = 0
      nativeAudioElement.play()
      setCurrentAudioTrack(index)
    }
  }

  function changeCurrentMusicTime(event) {
    const nativeAudioElement = document.getElementById('native-audio-element')

    const audioDuration = nativeAudioElement.duration
    const progressOffsetWidth = progressWrapperRef.current.offsetWidth
    const progressOffsetLeft = progressWrapperRef.current.offsetLeft + trackitemRef.current.offsetLeft

    const newPosition = (event.pageX - progressOffsetLeft) * audioDuration / progressOffsetWidth
    nativeAudioElement.currentTime = newPosition

    const newWidth = 100 * nativeAudioElement.currentTime / nativeAudioElement.duration
    setProgressBarWidth(newWidth)
  }

  const trackItemStyle = {}
  if (audioTrack._id === userAudioTracks[currentAudioTrack]?._id) {
    trackItemStyle.backgroundColor = isDarkTheme ? '#3a3a3a' : '#e0e0e0'
  }

  return(
    <div ref={trackitemRef} className={trackitemClassName} style={trackItemStyle} >
      <button className={buttonClassname} onClick={playpause} >
        {(isMusicPlaying && audioTrack._id === userAudioTracks[currentAudioTrack]._id) ? 'pause' : 'play'}
      </button>
      {
        currentAudioTrack !== null && audioTrack._id === userAudioTracks[currentAudioTrack]._id
        ?
        <div style={{width: 'calc(100% - 4rem)'}} >
          <div style={{fontSize: '1rem', marginLeft: '1rem'}} >{audioTrack.title}</div>
          <div
            ref={progressWrapperRef}
            onClick={changeCurrentMusicTime}
            className='trackitem-progress-wrapper'
          >
            <div className={trackitemBarClassName} >
              <div
                className={trackitemTimeClassName}
                style={{width: currentMusicTime + '%'}}
              />
            </div>
          </div>
        </div>
        :
        <div style={{fontSize: '1.5rem', marginLeft: '1rem'}} >{audioTrack.title}</div>
      }
      {
        // if user listening this track then we cannot delete it
        currentAudioTrack !== index
        ?
        <button className={deleteSignClassName} onClick={deleteTrack} >&#10006;</button>
        :
        null
      }
    </div>
  )
}

const mapStateToProps = store => {
  return {
    userName: store.account.userName,
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
    userLogout: bindActionCreators(userLogout, dispatch),
    deleteAudioTrack: bindActionCreators(deleteAudioTrack, dispatch),
    setIsMusicPlaying: bindActionCreators(setIsMusicPlaying, dispatch),
    changePopUpDisplay: bindActionCreators(changePopUpDisplay, dispatch),
    setProgressBarWidth: bindActionCreators(setProgressBarWidth, dispatch),
    setCurrentAudioTrack: bindActionCreators(setCurrentAudioTrack, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(AudioTrack)
