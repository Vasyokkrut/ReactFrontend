import axios from 'axios'
import { connect } from 'react-redux'
import React, { useState } from 'react'
import { bindActionCreators } from 'redux'

import { userLogin } from '../../Store/actions.js'

function ChangeNickname({JWTToken, userLogin, currentUserName}) {

  const [newNickname, setNewNickname] = useState('')
  const [isChangeSuccessful, setIsChangeSuccessful] = useState(null)
  const [statusMessage, setStatusMessage] = useState('')

  const statusStyle = {
    height: '2rem',
    fontSize: '1.5rem',
    color: isChangeSuccessful ? 'green' : 'red',
    visibility: isChangeSuccessful === null ? 'hidden' : 'visible'
  }

  function changeNicknameHandler() {
    if (newNickname.trim() === '') {
      setIsChangeSuccessful(false)
      setStatusMessage('new nickname is empty')
      return
    }
    if (newNickname === currentUserName) {
      setIsChangeSuccessful(false)
      setStatusMessage('this nickname is the same')
      return
    }
    setIsChangeSuccessful(null)
    const data = {newNickname}
    const config = {headers: {Authorization: 'Bearer ' + JWTToken}}
    axios.patch('/api/changeNickname', data, config)
      .then(res => {
        localStorage.setItem('JWTToken', res.data.newJWTToken)
        localStorage.setItem('LoginData', JSON.stringify({login:newNickname}))
        userLogin({username:newNickname, JWTToken: res.data.newJWTToken})
        setIsChangeSuccessful(true)
        setStatusMessage('nickname changed successfully')
      })
      .catch(err => {
        setIsChangeSuccessful(false)
        setStatusMessage('this user exists yet')
      })
  }

  return (
    <div className='change-nickname' >
      <div>
        <input
          type='text'
          value={newNickname}
          onChange={event => setNewNickname(event.target.value)}
          className='change-nickname-input'
          placeholder='enter your new nickname'
        />
      </div>
      <div>
        <span style={statusStyle}>
          {statusMessage}
        </span>
      </div>
      <div>
        <button className='BtnFullPicture' onClick={changeNicknameHandler} >
          Change
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = store => {
  return {
    currentUserName: store.userName,
    JWTToken: store.userJWTToken
  }
}

const mapActionsToProps = dispatch => {
  return {
    userLogin: bindActionCreators(userLogin, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(ChangeNickname)
