import axios from 'axios'
import { useState } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import { softLogout } from '../../utilities.js'

function DeleteAccount({isDarkTheme}) {
  const [isWarning, setIsWarning] = useState(true)
  const [password, setPassword] = useState('')
  const [deletingStatus, setDeletingStatus] = useState({
    message: '',
    successful: null
  })

  const changingStatusStyle = {
    height: '1.5rem',
    fontSize: '1.5rem',
    color: deletingStatus.successful ? 'green' : 'red'
  }

  const deleteButtonClassName = classNames(
    'primary-button',
    isDarkTheme ? 'primary-button-danger-dark' : 'primary-button-danger-light'
  )

  const inputClassName = classNames(
    'change-form-input',
    isDarkTheme ? 'change-form-input-dark' : 'change-form-input-light'
  )

  function deleteHandler() {
    if (!password) {
      setDeletingStatus({
        successful: false,
        message: 'please, confirm you password'
      })
      return
    }

    setDeletingStatus({
      successful: true,
      message: 'please, wait...'
    })

    const config = {
      data: {
        password
      }
    }
    axios.delete('/api/account/settings/deleteAccount', config)
      .then((res) => softLogout())
      .catch(err => {
        const status = err.response.status
        if(status === 400) {
          setDeletingStatus({
            successful: false,
            message: 'wrong password'
          })
        } else {
          setDeletingStatus({
            successful: false,
            message: 'sorry, something went wrong, try again later'
          })
        }
      })
  }

  if (isWarning) {
    return (
      <div className='deleting-prompt' >
        <div style={{height: '5rem'}} >
          <div>are you sure you want to delete your account? this action is irreversible!</div>
        </div>
        <button
          className={deleteButtonClassName}
          onClick={() => setIsWarning(false)}
        >
          Delete
        </button>
      </div>
    )
  }

  return (
    <div className='deleting-prompt' >
      <div style={{height: '5rem', width: '100%'}} >
        <input
          type='password'
          value={password}
          className={inputClassName}
          placeholder='confirm your password'
          onChange={(event) => setPassword(event.target.value)}
        />
        <div style={changingStatusStyle}>
          {deletingStatus.message}
        </div>
      </div>
      <button
        onClick={deleteHandler}
        className={deleteButtonClassName}
      >
        Delete
      </button>
    </div>
  )
}

const mapStateToProps = store => {
  return {
    isDarkTheme: store.appearance.isDarkTheme
  }
}

export default connect(mapStateToProps)(DeleteAccount)
