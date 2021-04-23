import axios from 'axios'
import { connect } from 'react-redux'
import React, { useState } from 'react'
import { bindActionCreators } from 'redux'

import { userLogout } from '../../Store/account/actions.js'
import { changePopUpDisplay } from '../../Store/appearance/actions.js'

function ChangePassword({userLogout, changePopUpDisplay}) {

  const [newPassword, setNewPassword] = useState('')
  const [changingStatus, setChangingStatus] = useState({message: '', successful: null})

  const changingStatusStyle = {
    height: '2rem',
    fontSize: '1.5rem',
    color: changingStatus.successful ? 'green' : 'red'
  }

  function checkPassword() {
    const allowedSymbols = /^[A-Za-z0-9]+$/

    // some checks for new password
    // password cannot be empty
    // and cannot contain special symbols
    // such as endlines or whitespaces
    if (newPassword === '') {
      setChangingStatus({
        successful: false,
        message: 'new password is empty'
      })
      return false
    }
    if (/\s/.test(newPassword)) {
      setChangingStatus({
        successful: false,
        message: 'password cannot contain whitespaces'
      })
      return false
    }
    if (!allowedSymbols.test(newPassword)) {
      setChangingStatus({
        successful: false,
        message: 'only letters and numbers allowed'
      })
      return false
    }
    return true
  }

  function changePassword() {
    if(!checkPassword(newPassword)) return

    // when user clicked the button this message will appear
    setChangingStatus({message: 'please wait...', successful: true})

    axios.patch('/api/account/settings/changePassword', { newPassword })
      .then(res => {
        setChangingStatus({
          successful: true,
          message: 'password changed successfully'
        })
      })
      .catch(err => {
        const status = err.response.status
        if (status === 401 || status === 403) {
          axios.get('/api/account/getNewAccessToken')
            .then(res => axios.patch('/api/account/settings/changePassword', { newPassword }))
            .then(res => {
              setChangingStatus({
                successful: true,
                message: 'password changed successfully'
              })
            })
            .catch(err => {
              const status = err.response.status
              if (status === 401 || status === 403) {
                localStorage.removeItem('userName')
                userLogout()
                changePopUpDisplay()
              } else {
                setChangingStatus({
                  successful: false,
                  message: 'Something went wrong :('
                })
              }
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
          type='text'
          value={newPassword}
          onChange={event => setNewPassword(event.target.value)}
          className='change-form-input'
          placeholder='enter your new password'
        />
      </div>
      <div style={changingStatusStyle}>
        {changingStatus.message}
      </div>
      <div>
        <button className='primary-button' onClick={changePassword} >
          Change
        </button>
      </div>
    </div>
  )
}

const mapActionsToProps = dispatch => {
  return {
    userLogout: bindActionCreators(userLogout, dispatch),
    changePopUpDisplay: bindActionCreators(changePopUpDisplay, dispatch)
  }
}

export default connect(null, mapActionsToProps)(ChangePassword)
