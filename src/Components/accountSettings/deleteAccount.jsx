import axios from 'axios'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { userLogout } from '../../Store/account/actions.js'
import { changePopUpDisplay } from '../../Store/appearance/actions.js'

function DeleteAccount({isDarkTheme, userLogout, changePopUpDisplay}) {

  const settingsButtonClassName = classnames(
    'settings-button',
    'settings-button-delete',
    isDarkTheme ? 'settings-button-dark' : 'settings-button-light'
  )

  function deleteHandler() {
    axios.delete('/api/account/settings/deleteAccount')
      .then(() => {
        localStorage.removeItem('userName')
        userLogout()
      })
      .catch(err => {
        const status = err.response.status
        if (status === 401 || status === 403) {
          axios.get('/api/account/getNewAccessToken')
            .then(res => axios.delete('/api/account/settings/deleteAccount'))
            .then(res => {
              localStorage.removeItem('userName')
              userLogout()
            })
            .catch(err => {
              const status = err.response.status
              if (status === 401 || status === 403) {
                localStorage.removeItem('userName')
                userLogout()
                changePopUpDisplay()
              } else {
                alert('error happened :(')
              }
            })
        } else {
          alert('error happened :(')
        }
      })
  }

  return (
    <div className='deleting-prompt' >
      <div>are you sure you want to delete your account?</div>
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
    isDarkTheme: store.appearance.isDarkTheme
  }
}

const mapActionsToProps = dispatch => {
  return {
    userLogout: bindActionCreators(userLogout, dispatch),
    changePopUpDisplay: bindActionCreators(changePopUpDisplay, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(DeleteAccount)
