import React from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import './styles.css'
import { changePopUpDisplay, userLogout } from '../../Store/actions.js'

function NavbarHeader(props) {
  let dropdownOptionClass = classNames('dropdown-option', `dropdown-option-${props.theme}`)
  let dropdowncontentClass = classNames('dropdown-content', `dropdown-content-${props.theme}`)
  let dropdownClassName = classNames('dropdown', `dropdown-${props.theme}`)
  let headerClassName = classNames(props.theme==='dark'?'darkHeader':'lightHeader')
    return(
        <header className={headerClassName} >
          <div className='navbar' >
            <div>
              <Link
                className={headerClassName}
                style={{textDecoration:'none'}}
                to='/'
              >
                Vasyokkrut
              </Link>
            </div>

            {props.isLoggedin
              ? // if user logged in
              <div>
                <div className={dropdownClassName} >
                  <div className='username'>
                    {props.userName}
                  </div>
                  <div 
                    className={dropdowncontentClass}
                  >
                    <div
                      className={dropdownOptionClass}
                      onClick={() => alert('functionality in development')}
                    >
                      account&nbsp;settings
                    </div>
                    <div
                      className={dropdownOptionClass}
                      onClick={props.userLogout}
                    >
                      exit&nbsp;from&nbsp;account
                    </div>
                  </div>
                </div>
              </div>

              : // if user aren't logged in
              <div>
                You could&ensp;
                <span
                  className='loginButton'
                  onClick={props.changePopUpDisplay}
                >
                  log in
                </span>
              </div>}
          </div>
        </header>
    )
}

const mapStateToProps = store => {
  return {
    theme: store.theme,
    isLoggedin: store.isLoggedin,
    userName: store.userName
  }
}
  
const mapActionsToProps = dispatch => {
  return {
    changePopUpDisplay: bindActionCreators(changePopUpDisplay, dispatch),
    userLogout: bindActionCreators(userLogout, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(NavbarHeader)
