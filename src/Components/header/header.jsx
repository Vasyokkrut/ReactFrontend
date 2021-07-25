import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './styles.scss'
import Dropdown from './dropdown.jsx'
import ThemeToggleSwitch from './themeToggleSwitch.jsx'
import AudioPlayerControls from '../music/audioPlayerControls.jsx'

function Header({isDarkTheme, userName, currentAudioTrack}) {

  const headerClassName = isDarkTheme ? 'header-dark' : 'header-light'

  return(
    <header className={headerClassName} >
      <div id='header-content' >
        <ThemeToggleSwitch />
        <Link className='home-link' to='/' >
          Vasyokkrut
        </Link>
        {
          currentAudioTrack !== null && userName
          ?
          <AudioPlayerControls />
          :
          null
        }
        <Dropdown />
      </div>
    </header>
  )
}

const mapStateToProps = store => {
  return {
    userName: store.account.userName,
    isDarkTheme: store.appearance.isDarkTheme,
    currentAudioTrack: store.music.currentAudioTrack
  }
}

export default connect(mapStateToProps)(Header)
