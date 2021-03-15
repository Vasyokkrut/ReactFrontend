import classnames from 'classnames'
import { connect } from 'react-redux'
import React, { useEffect, useState } from 'react'

import './styles.scss'
import DeleteAccount from './deleteAccount.jsx'
import ChangeUserName from './changeUserName.jsx'
import ChangePassword from './changePassword.jsx'

// this component is part of AccountSettings component
// and shows selected option by user
function SelectedOption({selectedOption}) {
  switch (selectedOption) {
    case 'changeUserName':
      return <ChangeUserName />
    case 'changePassword':
      return <ChangePassword />
    case 'deleteAccount':
      return <DeleteAccount />
    default:
      return null
  }
}

function AccountSettings({isDarkTheme, isLoggedIn}) {

  // this useState is for define which option will be displayed
  // it will contain one of these options:
  // null, 'changeUserName', 'changePassword', 'deleteAccount'
  const [selectedOption, setSelectedOption] = useState(null)

  // when user relogins
  // component should display nothing as default option
  useEffect(() => {
    setSelectedOption(null)
  }, [isLoggedIn])

  const settingsButtonClassName = classnames(
    'settings-button',
    isDarkTheme ? 'settings-button-dark' : 'settings-button-light'
  )

  // if user didn't log in to website this message will be displayed
  if (!isLoggedIn) {
    return (
      <div style={{fontSize: '4rem', textAlign: 'center'}} >
        You aren't logged in
      </div>
    )
  }

  return(
    <div className='account-settings' >
      <div className='account-name' >account settings</div>
      <div className='setting-item' >
        <div
          className={settingsButtonClassName}
          onClick={() => setSelectedOption('changeUserName')}
        >
          Change username
        </div>
        <div
          className={settingsButtonClassName}
          onClick={() => setSelectedOption('changePassword')}
        >
          Change password
        </div>
        <div
          className={settingsButtonClassName}
          onClick={() => setSelectedOption('deleteAccount')}
        >
          Delete account
        </div>
      </div>
      <SelectedOption selectedOption={selectedOption} />
    </div>
  )
}

const mapStateToProps = store => {
  return {
    isDarkTheme: store.isDarkTheme,
    isLoggedIn: store.isLoggedIn
  }
}

export default connect(mapStateToProps, null)(AccountSettings)
