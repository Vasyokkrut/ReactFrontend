import axios from 'axios'
import classNames from 'classnames'
import { connect } from 'react-redux'
import React, { useState } from 'react'
import { bindActionCreators } from 'redux'

import { userLogin, userLogout } from '../../Store/account/actions.js'
import { changePopUpDisplay } from '../../Store/appearance/actions.js'

function ChangeUserName({isDarkTheme, userLogin, userLogout, currentUserName, changePopUpDisplay }) {

  const [newUserName, setNewUserName] = useState('')
  const [password, setPassword] = useState('')
  const [changingStatus, setChangingStatus] = useState({message: '', successful: null})

  const changingStatusStyle = {
    color: changingStatus.successful ? 'green' : 'red'
  }

  const inputClassName = classNames(
    'change-form-input',
    isDarkTheme ? 'change-form-input-dark' : 'change-form-input-light'
  )

  const buttonClassName = classNames(
    'primary-button',
    isDarkTheme ? 'primary-button-dark' : 'primary-button-light'
  )

  function changeUserNameHandler() {

    const allowedSymbols = /^[A-Za-z0-9]+$/

    // some checks for new username
    if (newUserName === '') {
      setChangingStatus({
        successful: false,
        message: 'new username is empty'
      })
      return
    }
    if (newUserName === currentUserName) {
      setChangingStatus({
        successful: false,
        message: 'new username is the same as current one'
      })
      return
    }
    if (/\s/.test(newUserName)) {
      setChangingStatus({
        successful: false,
        message: 'username cannot contain whitespaces'
      })
      return
    }
    if (!allowedSymbols.test(newUserName)) {
      setChangingStatus({
        successful: false,
        message: 'only letters and numbers allowed'
      })
      return
    }

    // when user clicked the button this message will appear
    setChangingStatus({message: 'please wait...', successful: true})

    const data = {
      newUserName,
      password
    }
    axios.patch('/api/account/settings/changeUserName', data)
      .then(res => {
        if (res.data.userExists) {
          setChangingStatus({
            successful: false,
            message: 'this user exists yet'
          })
        } else {
          localStorage.setItem('userName', newUserName)
          userLogin({userName: newUserName})
          setChangingStatus({
            successful: true,
            message: 'username changed successfully'
          })
          setNewUserName('')
          setPassword('')
        }
      })
      .catch(err => {
        const status = err.response.status
        if (status === 401 || status === 403) {
          localStorage.removeItem('userName')
          userLogout()
          changePopUpDisplay()
        } else if (status === 400) {
          setChangingStatus({
            successful: false,
            message: 'wrong password'
          })
        } else {
          setChangingStatus({
            successful: false,
            message: 'something went wrong :('
          })
        }
      })
  }

  return (
    <div className='change-form' >
      <div>
        <input
          type='text'
          value={newUserName}
          onChange={event => setNewUserName(event.target.value)}
          className={inputClassName}
          placeholder='enter your new username'
        />
      </div>
      <div>
        <input
          type='password'
          value={password}
          onChange={event => setPassword(event.target.value)}
          className={inputClassName}
          placeholder='confirm your password'
        />
      </div>
      <div style={changingStatusStyle} className='settings-status' >
        {changingStatus.message}
      </div>
      <div>
        <button className={buttonClassName} onClick={changeUserNameHandler} >
          Change
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = store => {
  return {
    currentUserName: store.account.userName,
    isDarkTheme: store.appearance.isDarkTheme
  }
}

const mapActionsToProps = dispatch => {
  return {
    userLogin: bindActionCreators(userLogin, dispatch),
    userLogout: bindActionCreators(userLogout, dispatch),
    changePopUpDisplay: bindActionCreators(changePopUpDisplay, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(ChangeUserName)
