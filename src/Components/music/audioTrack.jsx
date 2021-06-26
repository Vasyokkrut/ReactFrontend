import axios from 'axios'
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
  currentAudioTrack,
  setIsMusicPlaying,
  currentMusicVolume,
  changePopUpDisplay,
  setProgressBarWidth,
  setCurrentAudioTrack,
}) {

  const buttonClassname = classnames(
    'audioplayer-button',
    isDarkTheme ? 'trackitem-button-dark' : 'trackitem-button-light'
  )

  const trackitemClassName = classnames(
    'trackitem',
    isDarkTheme ? 'trackitem-dark' : 'trackitem-light'
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

  const trackItemStyle = {}
  if (audioTrack._id === userAudioTracks[currentAudioTrack]?._id) {
    trackItemStyle.backgroundColor = isDarkTheme ? '#3a3a3a' : '#e0e0e0'
  }

  return(
    <div className={trackitemClassName} style={trackItemStyle} >
      <button className={buttonClassname} onClick={playpause} >
        {(isMusicPlaying && audioTrack._id === userAudioTracks[currentAudioTrack]._id) ? 'pause' : 'play'}
      </button>
      <div className='trackitem-title' >{audioTrack.title}</div>
      {
        // if user listening this track then we cannot delete it
        // so we should check is this track the one user listening to
        // otherwise delete button won't appear
        currentAudioTrack !== index
        ?
        <div className='trackitem-delete' onClick={deleteTrack} >&#10006;</div>
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
