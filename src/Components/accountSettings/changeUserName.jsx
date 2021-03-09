import axios from 'axios'
import { connect } from 'react-redux'
import React, { useState } from 'react'
import { bindActionCreators } from 'redux'

import { userLogin } from '../../Store/actions.js'

function ChangeUserName({ userJWT, userLogin, currentUserName }) {

  const [newUserName, setNewUserName] = useState('')
  const [changingStatus, setChangingStatus] = useState({message: '', successful: null})

  const changingStatusStyle = {
    height: '2rem',
    fontSize: '1.5rem',
    color: changingStatus.successful ? 'green' : 'red'
  }

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
        message: 'this username is the same'
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

    // set data and configuration for request
    const data = { newUserName }
    const config = {headers: {Authorization: 'Bearer ' + userJWT}}
    axios.patch('/api/accountSettings/changeUserName', data, config)
      .then(res => {
        
        if (res.data.userExists) {
          setChangingStatus({
            successful: false,
            message: 'this user exists yet'
          })
          return
        }

        localStorage.setItem('userJWT', res.data.newJWT)
        localStorage.setItem('userName', newUserName)
        userLogin({userName: newUserName, userJWT: res.data.newJWT})
        setChangingStatus({
          successful: true,
          message: 'username changed successfully'
        })
      })
      .catch(() => {
        setChangingStatus({
          successful: false,
          message: 'something went wrong :('
        })
      })
  }

  return (
    <div className='change-form' >
      <div>
        <input
          type='text'
          value={newUserName}
          onChange={event => setNewUserName(event.target.value)}
          className='change-form-input'
          placeholder='enter your new username'
        />
      </div>
      <div>
        <span style={changingStatusStyle}>
          {changingStatus.message}
        </span>
      </div>
      <div>
        <button className='BtnFullPicture' onClick={changeUserNameHandler} >
          Change
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = store => {
  return {
    userJWT: store.userJWT,
    currentUserName: store.userName
  }
}

const mapActionsToProps = dispatch => {
  return {
    userLogin: bindActionCreators(userLogin, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(ChangeUserName)
