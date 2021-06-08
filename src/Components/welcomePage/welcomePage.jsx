import classnames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './styles.scss'
import LoginPage from '../loginPage/loginPage.jsx'

function WelcomePage({isDarkTheme, userName}) {

  if (!userName) return <LoginPage />

  const featureItemClassName = classnames(
    'welcome-feature-item',
    isDarkTheme ? 'welcome-feature-item-dark' : 'welcome-feature-item-light'
  )

  const welcomeContainerClassName = classnames(
    'welcome-container',
    isDarkTheme ? 'welcome-container-dark' : 'welcome-container-light'
  )

  const hrStyle = {
    backgroundColor: isDarkTheme ? '#555' : '#ccc'
  }

  return(
    <div className={welcomeContainerClassName}>
      <div>Welcome!</div>
      <div>Thank you for registered your account!</div>
      <hr className='hr-line' style={hrStyle} />
      <div>Here you can use many features:</div>
      <ul>
        <li className={featureItemClassName} >
          <Link to='/music' >upload music</Link>
        </li>
        <li className={featureItemClassName} >
          <Link to={`/userPosts/${userName}`} >upload posts</Link>
        </li>
        <li className={featureItemClassName} >
          <Link to='/friends' >find friends</Link>
        </li>
      </ul>
      <hr className='hr-line' style={hrStyle} />
      <div>
        Anyway, you always can find any
        feature just by using aside navigation lists
      </div>
      <hr className='hr-line' style={hrStyle} />
      <div>Enjoy!</div>
    </div>
  )
}

const mapStateToProps = store => {
  return {
    userName: store.account.userName,
    isDarkTheme: store.appearance.isDarkTheme
  }
}

export default connect(mapStateToProps)(WelcomePage)
