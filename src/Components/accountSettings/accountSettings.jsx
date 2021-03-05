import classnames from 'classnames'
import { connect } from 'react-redux'
import React, { useState } from 'react'

import './styles.css'
import DeleteAccount from './deleteAccount.jsx'
import ChangeNickname from './changeNickname.jsx'
import ChangePassword from './changePassword.jsx'

// this component is part of AccountSettings component
// and is shows selected option by user
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

function AccountSettings({theme, isLoggedin}) {

  // this usestate is for define which option will be displayed
  // it will contain one of these options:
  // null, 'changeNickname', 'changePassword', 'deleteAccount'
  const [selectedOption, setSelectedOption] = useState(null)

  const settingsButtonClassName = classnames(
    'settings-button',
    theme === 'dark' ? 'settings-button-Dark' : 'settings-button-Light'
  )

  // if user didn't log in to website this message will be displayed
  if (!isLoggedin) {
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
    theme: store.theme,
    isLoggedin: store.isLoggedin
  }
}

export default connect(mapStateToProps, null)(AccountSettings)
