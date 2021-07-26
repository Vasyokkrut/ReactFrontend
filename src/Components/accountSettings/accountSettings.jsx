import classnames from 'classnames'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'

import './styles.scss'
import DeleteAccount from './deleteAccount.jsx'
import ChangeUserName from './changeUserName.jsx'
import ChangePassword from './changePassword.jsx'
import LoginPage from '../loginPage/loginPage.jsx'
import { softLogout } from '../../utilities.js'

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
  const [optionClassName, setOptionClassName] = useState('selected-option')
  const [optionsClassName, setOptionsClassName] = useState('settings-options')

  const settingsButtonClassName = classnames(
    'primary-button',
    isDarkTheme ? 'primary-button-dark' : 'primary-button-light'
  )

  // when user relogins
  // component should display nothing as default option
  useEffect(() => {
    return () => {
      if (userName === null) setSelectedOption(null)
    }
  }, [userName])

  function chooseOption(option) {
    setSelectedOption(option)
    setOptionClassName('selected-option open-right')
    setOptionsClassName('settings-options hide-left')
  }

  function returnBack() {
    setTimeout(() => {
      setSelectedOption(null)
    }, 200)
    setOptionClassName('selected-option hide-right')
    setOptionsClassName('settings-options open-left')
  }

  if (!userName) return <LoginPage />

  return(
    <div className='settings-container' >
      <div className={optionsClassName} >
        <div>account settings</div>
        <div className='settings-content' >
          <button
            className={settingsButtonClassName}
            onClick={() => chooseOption('changeUserName')}
          >Change username <div>&rsaquo;</div></button>
          <button
            className={settingsButtonClassName}
            onClick={() => chooseOption('changePassword')}
          >Change password <div>&rsaquo;</div></button>
          <button
            className={settingsButtonClassName}
            onClick={() => chooseOption('deleteAccount')}
          >Delete account <div>&rsaquo;</div></button>
          <button
            className={settingsButtonClassName}
            onClick={softLogout}
          >Exit from account</button>
        </div>
      </div>
      <div className={optionClassName} >
        <button onClick={returnBack} className={settingsButtonClassName} >back</button>
        <SelectedOption selectedOption={selectedOption} />
      </div>
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
