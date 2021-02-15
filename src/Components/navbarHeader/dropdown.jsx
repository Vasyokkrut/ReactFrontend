import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { changePopUpDisplay, userLogout, changeTheme } from '../../Store/actions.js'

function Dropdown(props) {
  function changeTheme() {
    localStorage.setItem('theme', props.theme==='dark'?'light':'dark')
    props.changeTheme()
  }

  function logout() {
    localStorage.removeItem('JWTToken')
    localStorage.removeItem('LoginData')
    props.userLogout()
  }

  let dropdownOptionClass = classNames('dropdown-option', `dropdown-option-${props.theme}`)
  let dropdownContentClass = classNames('dropdown-content', `dropdown-content-${props.theme}`)
  let dropdownClassName = classNames('dropdown', {[`dropdown-${props.theme}`]:props.isLoggedin})

  if (props.isLoggedin) {
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
  } else {
    return (
      <div className={dropdownClassName} >
        <div className='loginContainer' >
          <div>
            You could&ensp;
            <span
              className='loginButton'
              onClick={props.changePopUpDisplay}
            >
              log in
            </span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    theme: store.theme,
    isLoggedin: store.isLoggedin,
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
