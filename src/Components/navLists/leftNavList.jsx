import classnames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { changePopUpDisplay } from '../../Store/appearance/actions.js'

function LeftList(props) {

  const sideBarClassName = classnames(
    'side-bar',
    'side-bar-left',
    props.isDarkTheme ? 'side-bar-dark' : 'side-bar-light'
  )
    
  const navItemClassName = classnames(
    'nav-item',
    props.isDarkTheme ? 'nav-item-dark' : 'nav-item-light',
  )

  const hrStyle = {
    backgroundColor: props.isDarkTheme ? '#555' : '#ccc'
  }

  return(
    <aside className={sideBarClassName}>
      <div style={{fontSize: '2rem'}} >
        Navigation:
      </div>
      <hr className='hr-line' style={hrStyle} />
      <nav style={{fontSize: '1.4rem'}} >
        {
          props.userName
          ?
          <>
            <Link
              className={navItemClassName}
              to={`/userPosts/${props.userName}`}
            >Posts</Link>
            <Link
              className={navItemClassName}
              to={'/music'}
            >Music</Link>
            <Link
              className={navItemClassName}
              to='/friends'
            >Friends</Link>
          </>
          :
          <span
            className={navItemClassName}
            onClick={props.changePopUpDisplay}
          >Login</span>
        }
      </nav>
    </aside>
  )
}

const mapStateToProps = store => {
  return {
    userName: store.account.userName,
    isDarkTheme: store.appearance.isDarkTheme
  }
}

const mapActionsToProps = dispatch => {
  return {
    changePopUpDisplay: bindActionCreators(changePopUpDisplay, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(LeftList)
