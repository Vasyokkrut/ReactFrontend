import classnames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function WelcomePage({isDarkTheme}) {
  const linkClassName = classnames(
    'flex-center',
    'welcome-link',
    isDarkTheme ? 'welcome-link-light' : 'welcome-link-dark'
  )

  return(
    <div className='welcome-container'>
      <Link
        className={linkClassName}
        to='/publicPosts'
      >
        Upload your own<br/>
        picture here!
      </Link>
    </div>
  )
}

const mapStateToProps = store => {
  return {
    isDarkTheme: store.appearance.isDarkTheme
  }
}

export default connect(mapStateToProps)(WelcomePage)
