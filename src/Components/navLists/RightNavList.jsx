import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { changeTheme, userLogout, changePopUpDisplay } from '../../Store/actions.js'

function RightList(props) {
    
    const sideBarClassName = classnames(
        'side-bar',
        'right-side-bar',
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

    function changeTheme() {
        localStorage.setItem('isDarkTheme', props.isDarkTheme ? 'false' : 'true')
        props.changeTheme()
    }

    function userLogout() {
        localStorage.removeItem('userJWT')
        localStorage.removeItem('userName')
        props.userLogout()
    }

    return(
        <div className={sideBarClassName}>
            <div style={{fontSize: '2rem'}}>
                Settings:
            </div>
            <hr className={separateLineClassName} />
            <nav style={{fontSize: '1.4rem'}} >
                <span
                    className={navItemClassName}
                    onClick={changeTheme}
                >
                    Change theme
                </span>
                {
                    props.isLoggedIn
                    ?
                    <>
                            <Link
                                className={navItemClassName}
                                to='/accountSettings'
                            >
                                Account Settings
                            </Link>
                            <span
                                className={navItemClassName}
                                onClick={userLogout}
                            >
                                Logout
                            </span>
                    </>
                    :
                    null
                }
            </nav>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        isDarkTheme: store.isDarkTheme,
        isLoggedIn: store.isLoggedIn
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
