import axios from 'axios'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { userLogout } from '../../Store/account/actions.js'
import { resetAudioPlayer } from '../../Store/music/actions.js'
import { changeTheme, changePopUpDisplay } from '../../Store/appearance/actions.js'

function RightList(props) {

  const sideBarClassName = classnames(
    'side-bar',
    'side-bar-right',
    props.isDarkTheme ? 'side-bar-dark' : 'side-bar-light'
  )

  const navItemClassName = classnames(
    'nav-item',
    props.isDarkTheme ? 'nav-item-dark' : 'nav-item-light',
  )

  const separateLineClassName = classnames(
    'separate-line',
    props.isDarkTheme ? 'separate-line-dark' : 'separate-line-light'
  )

  function changeTheme() {
    localStorage.setItem('isDarkTheme', props.isDarkTheme ? 'false' : 'true')
    props.changeTheme()
  }

  function userLogout() {
    axios.get('/api/account/logout')
    localStorage.removeItem('userName')
    props.userLogout()
    props.resetAudioPlayer()
  }

  return(
    <div className={sideBarClassName}>
      <div style={{fontSize: '2rem'}}>
        Settings:
      </div>
      <hr className={separateLineClassName} />
      <nav style={{fontSize: '1.4rem'}} >
        <span
          className={navItemClassName}
          onClick={changeTheme}
        >
          Change theme
        </span>
        {
          props.userName
          ?
          <>
            <Link
              className={navItemClassName}
              to='/accountSettings'
            >
              Account Settings
            </Link>
            <span
              className={navItemClassName}
              onClick={userLogout}
            >
              Logout
            </span>
          </>
          :
          null
        }
      </nav>
    </div>
  )
}

const mapStateToProps = store => {
  return {
    userName: store.account.userName,
    isDarkTheme: store.appearance.isDarkTheme
  }
}

const mapActionsToProps = dispatch => {
  return {
    userLogout: bindActionCreators(userLogout, dispatch),
    changeTheme: bindActionCreators(changeTheme, dispatch),
    resetAudioPlayer: bindActionCreators(resetAudioPlayer, dispatch),
    changePopUpDisplay: bindActionCreators(changePopUpDisplay, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(RightList)
