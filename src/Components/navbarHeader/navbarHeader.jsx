import React from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changePopUpDisplay } from '../../Store/actions.js'
import './styles.css'

function NavbarHeader(props) {
    return(
        <header className={props.theme==='dark'?'darkHeader':'lightHeader'} >
          <div className='navbar' >
            <div>
              <Link
                className={props.theme==='dark'?'darkHeader':'lightHeader'}
                style={{textDecoration:'none'}}
                to='/'
              >
                Vasyokkrut
              </Link>
            </div>

            {props.isLoggedin
              ? // if user logged in
              <div>
                {props.userName}
              </div>

              : // if user doesn't logged in
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
    changePopUpDisplay: bindActionCreators(changePopUpDisplay, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(NavbarHeader)
