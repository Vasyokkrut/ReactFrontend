import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'

import './styles.css'

function AccountSettings({theme, isLoggedin}) {
  const settingsButtonClassName = classnames(
    'Settings-Button',
    theme === 'dark' ? 'Settings-Button-Dark' : 'Settings-Button-Light'
  )

  if (!isLoggedin) return <div style={{fontSize: '4rem', textAlign: 'center'}} >You aren't logged in</div>

  return(
    <div className='Account-Settings' >
      <div className='AccName' >account settings</div>
      <div className='Setting-Item' >
        <div className={settingsButtonClassName} >Change nickname</div>
        <div className={settingsButtonClassName} >Change password</div>
        <div className={settingsButtonClassName} >Delete account</div>
      </div>
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
