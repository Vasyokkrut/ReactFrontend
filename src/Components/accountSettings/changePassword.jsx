import axios from 'axios'
import { connect } from 'react-redux'
import React, { useState } from 'react'

function ChangePassword({ JWTToken }) {

  const [newPassword, setNewPassword] = useState('')
  const [changingStatus, setChangingStatus] = useState({message: '', successful: null})

  const changingStatusStyle = {
    height: '2rem',
    fontSize: '1.5rem',
    color: changingStatus.successful ? 'green' : 'red'
  }

  function changePasswordHandler() {

    const allowedSymbols = /^[A-Za-z0-9]+$/

    // some checks for new password
    if (/\s/.test(newPassword)) {
      setChangingStatus({
        successful: false,
        message: 'password cannot contain whitespaces'
      })
      return
    }
    if (!allowedSymbols.test(newPassword)) {
      setChangingStatus({
        successful: false,
        message: 'only letters and numbers allowed'
      })
      return
    }
    if (newPassword === '') {
      setChangingStatus({
        successful: false,
        message: 'new password is empty'
      })
      return
    }

    // when user clicked the button this message will appear
    setChangingStatus({message: 'please wait...', successful: true})

    // set data and configuration for request
    const data = { newPassword }
    const config = {headers: {Authorization: 'Bearer ' + JWTToken}}
    axios.patch('/api/changePassword', data, config)
      .then(res => {
        setChangingStatus({
          successful: true,
          message: 'password changed successfully'
        })
      })
      .catch(err => {
        setChangingStatus({
          successful: false,
          message: 'Something went wrong :('
        })
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
      <div>
        <span style={changingStatusStyle}>
          {changingStatus.message}
        </span>
      </div>
      <div>
        <button className='BtnFullPicture' onClick={changePasswordHandler} >
          Change
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = store => {
  return {
    JWTToken: store.userJWTToken
  }
}

export default connect(mapStateToProps, null)(ChangePassword)
