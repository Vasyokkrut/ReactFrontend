import axios from 'axios'
import { connect } from 'react-redux'
import React, { useState } from 'react'
import { bindActionCreators } from 'redux'

import { userLogin, userLogout } from '../../Store/account/actions.js'
import { changePopUpDisplay } from '../../Store/appearance/actions.js'

function ChangeUserName({ userLogin, userLogout, currentUserName, changePopUpDisplay }) {

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

    axios.patch('/api/account/settings/changeUserName', { newUserName })
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
        }
      })
      .catch(err => {
        const status = err.response.status
        if (status === 401 || status === 403) {
          axios.get('/api/account/getNewAccessToken')
          .then(res => axios.patch('/api/account/settings/changeUserName', { newUserName }))
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
              }
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
                  message: 'something went wrong :('
                })
              }
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
          className='change-form-input'
          placeholder='enter your new username'
        />
      </div>
      <div style={changingStatusStyle}>
        {changingStatus.message}
      </div>
      <div>
        <button className='primary-button' onClick={changeUserNameHandler} >
          Change
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = store => {
  return {
    currentUserName: store.account.userName
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
