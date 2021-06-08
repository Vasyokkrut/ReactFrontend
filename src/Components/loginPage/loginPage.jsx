import classnames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './styles.scss'
import { changePopUpDisplay } from '../../Store/appearance/actions.js'

function LoginPage({isDarkTheme, changePopUpDisplay}) {

  const containerClassName = classnames(
    'login-page-container',
    isDarkTheme ? 'login-page-container-dark' : 'login-page-container-light'
  )

  const buttonClassName = classnames(
    'primary-button',
    isDarkTheme ? 'login-page-button-dark' : 'login-page-button-light'
  )

  const featureItemClassName = classnames(
    'login-page-feature',
    isDarkTheme ? 'login-page-feature-dark' : 'login-page-feature-light'
  )

  const hrStyle = {
    backgroundColor: isDarkTheme ? '#555' : '#ccc'
  }

  return (
    <div className={containerClassName} >
      <div>it seems you aren't logged in...</div>
      <div>do you like to log in now?</div>
      <hr className='hr-line' style={hrStyle} />
      <div>you will have access to these features:</div>
      <ul>
        <li className={featureItemClassName} >upload music</li>
        <li className={featureItemClassName} >upload posts</li>
        <li className={featureItemClassName} >find friends</li>
      </ul>
      <div className='flex-center' >
        <button className={buttonClassName} onClick={changePopUpDisplay} >Log in</button>
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
    changePopUpDisplay: bindActionCreators(changePopUpDisplay, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(LoginPage)
