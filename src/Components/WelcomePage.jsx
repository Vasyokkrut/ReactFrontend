import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function WelcomePage({darkTheme}) {
  const linkClassName = classnames('WelcomeLink', 'Flexible', darkTheme ? 'WhiteLink' : 'DarkLink')
  return(
    <div className='MainLink'>
      <div className='Flexible'>
        <Link
          className={linkClassName}
          to='/publicPosts'
        >
          Upload your own<br/>
          picture here!
        </Link>
      </div>
    </div>
  )
}

const mapStateToProps = store => {
  return {
    darkTheme: store.darkTheme
  }
}

export default connect(mapStateToProps, null)(WelcomePage)
