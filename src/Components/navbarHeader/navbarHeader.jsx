import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './styles.scss'
import Dropdown from './dropdown.jsx'
import AudioPlayerControls from '../music/audioPlayerControls.jsx'

function NavbarHeader({isDarkTheme, userName, currentAudioTrack}) {

  const headerClassName = isDarkTheme ? 'header-dark' : 'header-light'

  return(
    <header className={headerClassName} >
      <div className='navbar' >
        <div>
          <Link
            className={headerClassName}
            style={{textDecoration:'none', outline: 'none'}}
            to='/'
          >
            Vasyokkrut
          </Link>
        </div>
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

export default connect(mapStateToProps, null)(NavbarHeader)
