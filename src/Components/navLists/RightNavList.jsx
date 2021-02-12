import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { changeTheme, userLogout, changePopUpDisplay } from '../../Store/actions.js'

function RightList(props) {

    let itemClassName=classnames('UsefulLink')
    let linkClassName=classnames(props.theme==='light'?'lightLinkText':'darkLinkText')
    let boxClassName=classnames(props.theme==='light'?'lightBox':'darkBox', 'RightBox', 'Box')

    function changeTheme() {
        localStorage.setItem('theme', props.theme==='dark'?'light':'dark')
        props.changeTheme()
    }

    function userLogout() {
        localStorage.removeItem('JWTToken')
        localStorage.removeItem('LoginData')
        props.userLogout()
    }

    return(
        <div className={boxClassName}>
            <div style={{fontSize:'2rem'}}>
                Settings:
            </div>
            <hr style={{ height:'2px', color:'#666', borderWidth:'0' , backgroundColor:'#666'}} />
            <nav>
                <ul className='RightList List'>
                    {
                    !props.isLoggedin
                    ?
                    <li className={linkClassName}>
                        <span
                            className={itemClassName}
                            onClick={props.changePopUpDisplay}
                        >
                            <span className='LinkText'>
                                <span style={{paddingLeft:'.4rem'}}>login</span>
                            </span>
                        </span>
                    </li>
                    :
                    null
                    }

                    <li className={linkClassName}>
                        <span
                            className={itemClassName}
                            onClick={changeTheme}
                        >
                            <span className='LinkText'>
                                <span style={{paddingLeft:'.4rem'}}>change theme</span>
                            </span>
                        </span>
                    </li>

                    {
                    props.isLoggedin
                    ?
                    <li className={linkClassName}>
                        <span
                            className={itemClassName}
                            onClick={userLogout}
                        >
                            <span className='LinkText'>
                                <span style={{paddingLeft:'.4rem'}}>logout</span>
                            </span>
                        </span>
                    </li>
                    :
                    null
                    }
                </ul>
            </nav>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        theme: store.theme,
        isLoggedin: store.isLoggedin
    }
}

const mapActionsToProps = dispatch => {
    return {
        userLogout: bindActionCreators(userLogout, dispatch),
        changeTheme: bindActionCreators(changeTheme, dispatch),
        changePopUpDisplay: bindActionCreators(changePopUpDisplay, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(RightList)
