import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { useCookies } from 'react-cookie'
import { bindActionCreators } from 'redux'
import { changePopUpDisplay, userLogout, changeTheme } from '../../Store/actions.js'

function Dropdown(props) {
  let [cookie, setCookie] = useCookies()
  function setThemeCookie() {
    let cookieSettings = {
      path:'/',
      expires: new Date(`December 17, ${(new Date()).getFullYear()+100} 03:24:00`)
    }
    if(cookie.theme===undefined) {
      setCookie('theme', props.theme, cookieSettings)
    }
    setCookie('theme', props.theme==='dark'?'light':'dark', cookieSettings)
  }

  let dropdownOptionClass = classNames('dropdown-option', `dropdown-option-${props.theme}`)
  let dropdowncontentClass = classNames('dropdown-content', `dropdown-content-${props.theme}`)
  let dropdownClassName = classNames('dropdown', `dropdown-${props.theme}`)

  if (props.isLoggedin) {
    return(
      <div className={dropdownClassName} >
        <div className='username'>
          {props.userName}
        </div>
        <div className={dropdowncontentClass}>
          <div
            className={dropdownOptionClass}
            onClick={() => {props.changeTheme(); setThemeCookie()}}
          >
            change&nbsp;theme
          </div>
          <div
            className={dropdownOptionClass}
            onClick={() => {
              localStorage.removeItem('LoginData')
              localStorage.removeItem('JWTToken')
              props.userLogout()
              }
            }
          >
            exit&nbsp;from&nbsp;account
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        You could&ensp;
        <span
          className='loginButton'
          onClick={props.changePopUpDisplay}
        >
          log in
        </span>
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
