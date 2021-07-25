import axios from 'axios'
import classNames from 'classnames'
import { connect } from 'react-redux'
import React, { useState } from 'react'
import { bindActionCreators } from 'redux'

import { userLogout } from '../../Store/account/actions.js'
import { changePopUpDisplay } from '../../Store/appearance/actions.js'

function ChangePassword({isDarkTheme, userLogout, changePopUpDisplay}) {

  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })
  const [changingStatus, setChangingStatus] = useState({
    message: '',
    successful: null
  })

  function setOldPassword(event) {
    setPassword({
      ...password,
      oldPassword: event.target.value
    })
  }
  function setFirstNewPassword(event) {
    setPassword({
      ...password,
      newPassword: event.target.value
    })
  }
  function setSecondNewPassword(event) {
    setPassword({
      ...password,
      confirmNewPassword: event.target.value
    })
  }

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

  function checkPassword() {
    const allowedSymbols = /^[A-Za-z0-9]+$/

    // some checks for new password
    // password cannot be empty
    // and cannot contain special symbols
    // such as endlines or whitespaces
    if (password.oldPassword === '') {
      setChangingStatus({
        successful: false,
        message: 'you should confirm your current password'
      })
      return false
    }
    if (password.newPassword === '') {
      setChangingStatus({
        successful: false,
        message: 'new password is empty'
      })
      return false
    }
    if (password.confirmNewPassword === '') {
      setChangingStatus({
        successful: false,
        message: 'you should confirm your new password'
      })
      return false
    }
    if (password.newPassword !== password.confirmNewPassword) {
      setChangingStatus({
        successful: false,
        message: 'your new passwords are not same'
      })
      return false
    }
    if (password.newPassword === password.oldPassword) {
      setChangingStatus({
        successful: false,
        message: 'your new password same as previous one'
      })
      return false
    }
    if (!allowedSymbols.test(password.newPassword)) {
      setChangingStatus({
        successful: false,
        message: 'only letters and numbers allowed'
      })
      return false
    }
    return true
  }

  function changePassword() {
    if(!checkPassword(password)) return

    // when user clicked the button this message will appear
    setChangingStatus({message: 'please wait...', successful: true})

    const data = {
      newPassword: password.newPassword,
      oldPassword: password.oldPassword
    }
    axios.patch('/api/account/settings/changePassword', data)
      .then(res => {
        setChangingStatus({
          successful: true,
          message: 'password changed successfully'
        })
        setPassword({
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        })
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
            message: 'old password is wrong'
          })
        } else {
          setChangingStatus({
            successful: false,
            message: 'Something went wrong :('
          })
        }
      })
  }

  return (
    <div className='change-form' >
      <div>
        <input
          type='password'
          value={password.oldPassword}
          onChange={setOldPassword}
          className={inputClassName}
          placeholder='enter your old password'
        />
      </div>
      <div>
        <input
          type='password'
          value={password.newPassword}
          onChange={setFirstNewPassword}
          className={inputClassName}
          placeholder='enter your new password'
        />
      </div>
      <div>
        <input
          type='password'
          value={password.confirmNewPassword}
          onChange={setSecondNewPassword}
          className={inputClassName}
          placeholder='repeat your new password'
        />
      </div>
      <div style={changingStatusStyle} className='settings-status' >
        {changingStatus.message}
      </div>
      <div>
        <button className={buttonClassName} onClick={changePassword} >
          Change
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = store => {
  return {
    isDarkTheme: store.appearance.isDarkTheme
  }
}

const mapActionsToProps = dispatch => {
  return {
    userLogout: bindActionCreators(userLogout, dispatch),
    changePopUpDisplay: bindActionCreators(changePopUpDisplay, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(ChangePassword)
