import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function WelcomePage({darkTheme}) {
  const linkClassName = classnames(
    'flex-center',
    'welcome-link',
    darkTheme ? 'welcome-link-light' : 'welcome-link-dark'
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
    darkTheme: store.darkTheme
  }
}

export default connect(mapStateToProps, null)(WelcomePage)
