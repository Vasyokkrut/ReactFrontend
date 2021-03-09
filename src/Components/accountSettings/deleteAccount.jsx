import React from 'react'
import axios from 'axios'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userLogout } from '../../Store/actions.js'

function DeleteAccount({darkTheme, userJWT, userLogout}) {

  const settingsButtonClassName = classnames(
    'settings-button',
    darkTheme ? 'settings-button-dark' : 'settings-button-light'
  )

  function deleteHandler() {
    const config = {headers: {Authorization: 'Bearer ' + userJWT}}
    axios.delete('/api/accountSettings/deleteAccount', config)
      .then(() => {
        localStorage.removeItem('userJWT')
        localStorage.removeItem('userName')
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
    darkTheme: store.darkTheme,
    userJWT: store.userJWT
  }
}

const mapActionsToProps = dispatch => {
  return {
    userLogout: bindActionCreators(userLogout, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(DeleteAccount)
