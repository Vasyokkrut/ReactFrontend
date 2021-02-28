import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { changeTheme, userLogout, changePopUpDisplay } from '../../Store/actions.js'

function RightList(props) {

    const linkClassName = classnames(
        props.theme === 'light'?'lightLinkText':'darkLinkText'
    )
    
    const boxClassName = classnames(
        'Box',
        'RightBox',
        props.theme === 'light'?'lightBox':'darkBox'
    )

    const itemClassName = classnames(
        'UsefulLink',
        props.theme === 'light'?'UsefulLinkDark':'UsefulLinkLight'
    )

    const separateLineClassName = classnames(
        'Separate-Line',
        props.theme === 'dark' ? 'Separate-Line-Dark' : 'Separate-Line-Light'
    )

    function changeTheme() {
        localStorage.setItem('theme', props.theme === 'dark'?'light':'dark')
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
            <hr className={separateLineClassName} />
            <nav>
                <ul className='RightList List'>

                    <li className={linkClassName}>
                        <span
                            className={itemClassName}
                            onClick={changeTheme}
                        >
                            <span className='LinkText'>
                                <span style={{paddingLeft:'.4rem'}}>Change theme</span>
                            </span>
                        </span>
                    </li>

                    {
                        props.isLoggedin
                        ?
                        <>
                            <li className={linkClassName}>
                                <Link
                                    className={itemClassName}
                                    to='/accountSettings'
                                >
                                    <span className='LinkText'>
                                        <span style={{paddingLeft:'.4rem'}}>Account Settings</span>
                                    </span>
                                </Link>
                            </li>
                            <li className={linkClassName}>
                                <span
                                    className={itemClassName}
                                    onClick={userLogout}
                                >
                                    <span className='LinkText'>
                                        <span style={{paddingLeft:'.4rem'}}>Logout</span>
                                    </span>
                                </span>
                            </li>
                        </>
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
