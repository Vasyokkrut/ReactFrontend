import classnames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { softLogout } from '../../utilities.js'
import { changeTheme } from '../../Store/appearance/actions.js'

function RightList(props) {

  const sideBarClassName = classnames(
    'side-bar',
    'side-bar-right',
    props.isDarkTheme ? 'side-bar-dark' : 'side-bar-light'
  )

  const navItemClassName = classnames(
    'nav-item',
    props.isDarkTheme ? 'nav-item-dark' : 'nav-item-light',
  )

  const hrStyle = {
    backgroundColor: props.isDarkTheme ? '#555' : '#ccc'
  }

  function changeTheme() {
    localStorage.setItem('isDarkTheme', props.isDarkTheme ? 'false' : 'true')
    props.changeTheme()
  }

  return(
    <aside className={sideBarClassName}>
      <div style={{fontSize: '2rem'}}>
        Settings:
      </div>
      <hr className='hr-line' style={hrStyle} />
      <nav style={{fontSize: '1.4rem'}} >
        <span
          className={navItemClassName}
          onClick={changeTheme}
        >Change theme</span>
        {
          props.userName
          ?
          <>
            <Link
              className={navItemClassName}
              to='/accountSettings'
            >Account settings</Link>
            <span
              className={navItemClassName}
              onClick={softLogout}
            >Logout</span>
          </>
          :
          null
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
    changeTheme: bindActionCreators(changeTheme, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(RightList)
