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

  const separateLineClassName = classnames(
    'separate-line',
    props.isDarkTheme ? 'separate-line-dark' : 'separate-line-light'
  )

  return(
    <div className={sideBarClassName}>
      <div style={{fontSize: '2rem'}} >
        Navigation:
      </div>
      <hr className={separateLineClassName} />
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
              to={'/myMusic'}
            >Music</Link>
            <Link
              className={navItemClassName}
              to='/friends'
            >Friends</Link>
          </>
          :
          <>
            <span
              className={navItemClassName}
              onClick={props.changePopUpDisplay}
            >Posts</span>
            <span
              className={navItemClassName}
              onClick={props.changePopUpDisplay}
            >Music</span>
            <span
              className={navItemClassName}
              onClick={props.changePopUpDisplay}
            >Friends</span>
          </>
        }
      </nav>
    </div>
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
