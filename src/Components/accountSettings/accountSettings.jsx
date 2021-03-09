import classnames from 'classnames'
import { connect } from 'react-redux'
import React, { useEffect, useState } from 'react'

import './styles.css'
import DeleteAccount from './deleteAccount.jsx'
import ChangeNickname from './changeNickname.jsx'
import ChangePassword from './changePassword.jsx'

// this component is part of AccountSettings component
// and shows selected option by user
function SelectedOption({selectedOption}) {
  switch (selectedOption) {
    case 'changeNickname':
      return <ChangeNickname />
    case 'changePassword':
      return <ChangePassword />
    case 'deleteAccount':
      return <DeleteAccount />
    default:
      return null
  }
}

function AccountSettings({darkTheme, isLoggedIn}) {

  // this useState is for define which option will be displayed
  // it will contain one of these options:
  // null, 'changeNickname', 'changePassword', 'deleteAccount'
  const [selectedOption, setSelectedOption] = useState(null)

  // when user relogins
  // component should display nothing as default option
  useEffect(() => {
    setSelectedOption(null)
  }, [isLoggedIn])

  const settingsButtonClassName = classnames(
    'settings-button',
    darkTheme ? 'settings-button-dark' : 'settings-button-light'
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
      <div className='AccName' >account settings</div>
      <div className='setting-item' >
        <div
          className={settingsButtonClassName}
          onClick={() => setSelectedOption('changeNickname')}
        >
          Change nickname
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
    darkTheme: store.darkTheme,
    isLoggedIn: store.isLoggedIn
  }
}

export default connect(mapStateToProps, null)(AccountSettings)
