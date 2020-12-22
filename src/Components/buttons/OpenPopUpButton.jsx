import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {changePopUpDisplay, userLogout} from '../../Store/actions.js'

function LoginFormPopup(props) {
    
    if(props.isLoggedin) {
        return (
            <div className='Flexible'>
                <button
                    className='button button1'
                    onClick={() => {
                        localStorage.removeItem('LoginData')
                        localStorage.removeItem('JWTToken')
                        props.userLogout()
                        }
                    }
                >
                    Leave Account
                </button>
            </div>
        )
    }
    return(
        <div className='Flexible'>
            <button
                className='button button1'
                onClick={props.changePopUpDisplay}
            >
                Log in account
            </button>
        </div>
    )
}

const mapActionsToProps = dispatch => {
    return {
      changePopUpDisplay: bindActionCreators(changePopUpDisplay, dispatch),
      userLogout: bindActionCreators(userLogout,dispatch)
    }
  }

export default connect(null, mapActionsToProps)(LoginFormPopup)