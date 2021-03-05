import axios from 'axios'
import { connect } from 'react-redux'
import React, { useState } from 'react'
import { bindActionCreators } from 'redux'

import { userLogin } from '../../Store/actions.js'

function ChangeNickname({JWTToken, userLogin, currentUserName}) {

  const [newNickname, setNewNickname] = useState('')
  const [changingStatus, setChangingStatus] = useState({message: '', successful: null})

  const changingStatusStyle = {
    height: '2rem',
    fontSize: '1.5rem',
    color: changingStatus.successful ? 'green' : 'red'
  }

  function changeNicknameHandler() {

    // some checks for new nickname
    if (newNickname === '') {
      setChangingStatus({
        successful: false,
        message: 'new nickname is empty'
      })
      return
    }
    if (/\s/.test(newNickname)) {
      setChangingStatus({
        successful: false,
        message: 'nickname cannot contain whitespaces'
      })
      return
    }
    if (newNickname === currentUserName) {
      setChangingStatus({
        successful: false,
        message: 'this nickname is the same'
      })
      return
    }

    // when user clicked the button this message will appear
    setChangingStatus({message: 'please wait...', successful: true})

    // set data and configuration for request
    const data = { newNickname }
    const config = {headers: {Authorization: 'Bearer ' + JWTToken}}
    axios.patch('/api/changeNickname', data, config)
      .then(res => {
        localStorage.setItem('JWTToken', res.data.newJWTToken)
        localStorage.setItem('LoginData', JSON.stringify({login:newNickname}))
        userLogin({username:newNickname, JWTToken: res.data.newJWTToken})
        setChangingStatus({
          successful: true,
          message: 'nickname changed successfully'
        })
      })
      .catch(err => {
        setChangingStatus({
          successful: false,
          message: 'this user exists yet'
        })
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
        <span style={changingStatusStyle}>
          {changingStatus.message}
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
