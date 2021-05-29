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

function AccountSettings({isDarkTheme, userName}) {

  // this useState is for define which option will be displayed
  // it will contain one of these options:
  // null, 'changeUserName', 'changePassword', 'deleteAccount'
  const [selectedOption, setSelectedOption] = useState(null)

  // when user relogins
  // component should display nothing as default option
  useEffect(() => {
    return () => {
      if (userName === null) setSelectedOption(null)
    }
  }, [userName])

  const settingsButtonClassName = classnames(
    'primary-button',
    isDarkTheme ? 'primary-button-dark' : 'primary-button-light'
  )

  // if user didn't log in to website this message will be displayed
  if (!userName) {
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
        <button
          className={settingsButtonClassName}
          onClick={() => setSelectedOption('changeUserName')}
        >Change username</button>
        <button
          className={settingsButtonClassName}
          onClick={() => setSelectedOption('changePassword')}
        >Change password</button>
        <button
          className={settingsButtonClassName}
          onClick={() => setSelectedOption('deleteAccount')}
        >Delete account</button>
      </div>
      <SelectedOption selectedOption={selectedOption} />
    </div>
  )
}

const mapStateToProps = store => {
  return {
    userName: store.account.userName,
    isDarkTheme: store.appearance.isDarkTheme
  }
}

export default connect(mapStateToProps)(AccountSettings)
