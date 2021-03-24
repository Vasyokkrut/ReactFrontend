import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './styles.scss'
import Dropdown from './dropdown.jsx'
import AudioPlayerControls from '../music/audioPlayerControls.jsx'

function NavbarHeader({isDarkTheme, currentAudioTrack}) {

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
        { currentAudioTrack !== null ? <AudioPlayerControls /> : null }
        <Dropdown />
      </div>
    </header>
  )
}

const mapStateToProps = store => {
  return {
    isDarkTheme: store.isDarkTheme,
    currentAudioTrack: store.currentAudioTrack
  }
}

export default connect(mapStateToProps, null)(NavbarHeader)
