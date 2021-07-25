import classNames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { stopMusic, setIsMusicPlaying } from '../../Store/music/actions'

function BottomNavList({
  userName,
  stopMusic,
  isDarkTheme,
  isMusicPlaying,
  userAudioTracks,
  setIsMusicPlaying,
  currentAudioTrack
}) {
  if (!userName) return null

  function stop() {
    document.getElementById('native-audio-element').pause()
    stopMusic()
  }

  function playPause() {
    const nativeAudioElement = document.getElementById('native-audio-element')
    if (isMusicPlaying) {
      nativeAudioElement.pause()
      setIsMusicPlaying(false)
    } else {
      nativeAudioElement.play()
      setIsMusicPlaying(true)
    }
  }

  const navBarClassName = classNames(
    'bottom-nav-bar',
    isDarkTheme ? 'bottom-nav-bar-dark' : 'bottom-nav-bar-light'
  )

  const navBarPlayerClassName = classNames(
    'bottom-nav-bar-player',
    isDarkTheme ? 'bottom-nav-bar-player-dark' : 'bottom-nav-bar-player-light'
  )

  return (
    <div className={navBarClassName} >
      {
        currentAudioTrack !== null ?
          <div className={navBarPlayerClassName} >
            <button onClick={playPause} >{isMusicPlaying ? 'pause' : 'play'}</button>
            <div>{userAudioTracks[currentAudioTrack].title}</div>
            <button onClick={stop} >stop</button>
          </div>
        : null
      }
      <div className='bottom-nav-bar-links' >
        <Link to={`/userposts/${userName}`} >posts</Link>
        <Link to='/music' >music</Link>
        <Link to='/friends' >friends</Link>
        <Link to='/accountSettings' >settings</Link>
      </div>
    </div>
  )
}

const mapStateToProps = store => {
  return {
    userName: store.account.userName,
    isDarkTheme: store.appearance.isDarkTheme,
    isMusicPlaying: store.music.isMusicPlaying,
    userAudioTracks: store.music.userAudioTracks,
    currentAudioTrack: store.music.currentAudioTrack
  }
}

const mapActionsToProps = dispatch => {
  return {
    stopMusic: bindActionCreators(stopMusic, dispatch),
    setIsMusicPlaying: bindActionCreators(setIsMusicPlaying, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(BottomNavList)
