import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './styles.scss'
import Dropdown from './dropdown.jsx'
import AudioPlayerControls from '../music/audioPlayerControls.jsx'

function Header({isDarkTheme, userName, currentAudioTrack}) {

  const headerClassName = isDarkTheme ? 'header-dark' : 'header-light'

  const linkStyle = {
    textDecoration:'none',
    outline: 'none',
    color: 'inherit',
    display: 'block'
  }

  return(
    <header className={headerClassName} >
      <div className='navbar' >
        <Link
          style={linkStyle}
          to='/'
        >
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
