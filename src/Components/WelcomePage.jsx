import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function WelcomePage(props) {
  let className = classnames('WelcomeLink', 'Flexible', props.theme === 'dark'?'WhiteLink':'DarkLink')
  return(
    <div className='MainLink'>
      <div className='Flexible'>
        <Link
          className={className}
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
    theme: store.theme
  }
}

export default connect(mapStateToProps, null)(WelcomePage)
