import classNames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { softLogout } from '../../utilities.js'
import { changePopUpDisplay, changeTheme } from '../../Store/appearance/actions.js'

function Dropdown(props) {
  function changeTheme() {
    localStorage.setItem('isDarkTheme', props.isDarkTheme ? 'false' : 'true')
    props.changeTheme()
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
    {'dropdown-dark': props.isDarkTheme && props.userName},
    {'dropdown-light': !props.isDarkTheme && props.userName}
  )

  if (props.userName) {
    return(
      <div className={dropdownClassName} >
        <Link className='username-link' to={`/userPosts/${props.userName}`} >
          {props.userName}
        </Link>
        <div className={dropdownContentClass}>
          <div
            className={dropdownOptionClass}
            onClick={changeTheme}
          >
            change&nbsp;theme
          </div>
          <div
            className={dropdownOptionClass}
            onClick={softLogout}
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
        <span>You could&ensp;</span>
        <span
          className='login-button'
          onClick={props.changePopUpDisplay}
        >
          log in
        </span>
      </div>
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
    changeTheme: bindActionCreators(changeTheme, dispatch),
    changePopUpDisplay: bindActionCreators(changePopUpDisplay, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Dropdown)
