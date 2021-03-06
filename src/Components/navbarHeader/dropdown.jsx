import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { changePopUpDisplay, userLogout, changeTheme } from '../../Store/actions.js'

function Dropdown(props) {
  function changeTheme() {
    localStorage.setItem('isDarkTheme', props.isDarkTheme ? 'false' : 'true')
    props.changeTheme()
  }

  function logout() {
    localStorage.removeItem('userJWT')
    localStorage.removeItem('userName')
    props.userLogout()
  }

  const dropdownOptionClass = classNames(
    'dropdown-option',
    props.isDarkTheme ? 'dropdown-option-dark' : 'dropdown-option-light'
  )
  const dropdownContentClass = classNames(
    'dropdown-content',
    props.isDarkTheme ? 'dropdown-content-dark' : 'dropdown-content-light'
  )
  const dropdownClassName = classNames(
    'dropdown',
    {'dropdown-dark': props.isDarkTheme && props.isLoggedIn},
    {'dropdown-light': !props.isDarkTheme && props.isLoggedIn}
  )

  if (props.isLoggedIn) {
    return(
      <div className={dropdownClassName} >
        <div className='username'>
          {props.userName}
        </div>
        <div className={dropdownContentClass}>
          <div
            className={dropdownOptionClass}
            onClick={changeTheme}
          >
            change&nbsp;theme
          </div>
          <div
            className={dropdownOptionClass}
            onClick={logout}
          >
            exit&nbsp;from&nbsp;account
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={dropdownClassName} >
      <div className='login-container' >
        <div>
          You could&ensp;
          <span
            className='login-button'
            onClick={props.changePopUpDisplay}
          >
            log in
          </span>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = store => {
  return {
    isDarkTheme: store.isDarkTheme,
    isLoggedIn: store.isLoggedIn,
    userName: store.userName
  }
}
  
const mapActionsToProps = dispatch => {
  return {
    changePopUpDisplay: bindActionCreators(changePopUpDisplay, dispatch),
    userLogout: bindActionCreators(userLogout, dispatch),
    changeTheme: bindActionCreators(changeTheme, dispatch),
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Dropdown)
