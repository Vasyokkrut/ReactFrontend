import React from 'react'
import axios from 'axios'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userLogout } from '../../Store/actions.js'

function DeleteAccount({theme, JWTToken, userLogout}) {

  const settingsButtonClassName = classnames(
    'settings-button',
    theme === 'dark' ? 'settings-button-dark' : 'settings-button-light'
  )

  function deleteHandler() {
    const config = {headers: {Authorization: 'Bearer ' + JWTToken}}
    axios.delete('/api/accountSettings/deleteAccount', config)
      .then(res => {
        localStorage.removeItem('JWTToken')
        localStorage.removeItem('LoginData')
        userLogout()
      })

  }

  return (
    <div className='deleting-prompt' >
      <div>do you indeed want to delete your account?</div>
      <div>this action is irreversible!</div>
      <div
        className={settingsButtonClassName}
        onClick={deleteHandler}
      >
        Delete
      </div>
    </div>
  )
}

const mapStateToProps = store => {
  return {
    theme: store.theme,
    JWTToken: store.userJWTToken
  }
}

const mapActionsToProps = dispatch => {
  return {
    userLogout: bindActionCreators(userLogout, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(DeleteAccount)
