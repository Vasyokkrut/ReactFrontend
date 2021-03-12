import axios from 'axios'
import classnames from 'classnames'
import { connect } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'

import './styles.css'
import { changePopUpDisplay, userLogin } from '../../Store/actions.js'

function PopUp(props) {
    // this array contains five states for five inputs in pop up
    const [loginState, setLoginState] = useState(['','','','',''])
    // this array contains two states for login and register parts in pop up
    // if first element is true, then login inputs will be disabled
    // if second element is true, then register inputs will be disabled
    const [isInputDisabled, setIsInputDisabled] = useState([false, false])
    // this state contains message that displays above the confirmation button
    // successful field wil change the color of this message
    const [loginStatus, setLoginStatus] = useState({message: '', successful: null})
    // class names for overlay, that covers all the screen
    // and is placed between the pop up and content
    const [overlayClassname, setOverlayClassName] = useState(classnames('overlay', 'overlay-open'))
    // class names for pop up
    const [popUpClassname, setPopUpClassName] = useState(classnames('modal-window', 'modal-window-opened'))

    // when user toggles pop up display, it should be clean
    // so we should reset the state of entire pop up
    useEffect(() => {
        setLoginState(['','','','',''])
        setIsInputDisabled([false, false])
        setLoginStatus({message: '', successful: null})
    }, [props.isPopUpHidden])

    // styles for status message that is placed above the confirmation button
    const loginStatusStyle = {
        height: '2rem',
        fontSize: '1.5rem',
        textAlign: 'center',
        color: loginStatus.successful ? 'green' : 'red'
    }

    // this function switches class names for pop up and overlay
    // and closes pop up and overlay
    // and the will disappear with animation
    function closePopup() {
        setTimeout(() => {
            props.changePopUpDisplay()
            setPopUpClassName(classnames('modal-window', 'modal-window-opened'))
            setOverlayClassName(classnames('overlay', 'overlay-open'))
        }, 200)
        setPopUpClassName(classnames('modal-window', 'modal-window-closed'))
        setOverlayClassName(classnames('overlay', 'overlay-close'))
    }

    // if something was typed to any input
    // this function will write it to the state
    function handleInput(e, idx) {
        const newState = [...loginState]
        newState[idx] = e.target.value
        if (idx === 0 || idx === 1){
            setIsInputDisabled([false, true])
        } else {
            setIsInputDisabled([true, false])
        }
        if (newState.every(el => el === '')) {
            setIsInputDisabled([false, false])
        }
        setLoginState(newState)
    }

    // this is the big function that filters all values before sending request
    // and sends request to register new user or log in existing user with its token
    function confirmHandler() {

        const allowedSymbols = /^[A-Za-z0-9]*$/

        // some checks for entered values
        if (loginState.every(el => el === '')) {
            setLoginStatus({
                successful: false,
                message: 'all fields are empty'
            })
            return
        }
        if (loginState.some(el => /\s/.test(el))) {
            setLoginStatus({
                successful: false,
                message: 'whitespaces are forbidden'
            })
            return
        }
        if (loginState.some(el => !allowedSymbols.test(el))) {
            setLoginStatus({
                successful: false,
                message: 'only letters and numbers allowed'
            })
            return
        }

        //checking if user is logging into website
        //by checking first and second fields
        if (loginState[0] && loginState[1]) {
            setLoginStatus({
                successful: true,
                message: 'please wait...'
            })
            const data = {userName: loginState[0], password: loginState[1]}
            axios.post('/login', data)
                .then(res => {
                    const userJWT = res.data.userJWT
                    props.userLogin({userName: loginState[0], userJWT: userJWT})
                    localStorage.setItem('userName', loginState[0])
                    localStorage.setItem('userJWT', userJWT)
                    closePopup()
                    setTimeout(() => {
                        setLoginState(['','','','',''])
                        setIsInputDisabled([false, false])
                    }, 200)
                })
                .catch(() => {
                    setLoginStatus({
                        successful: false,
                        message: 'wrong login or password'
                    })
                })
            return
        }

        //checking if user is making new account
        //by checking third forth and fifth fields
        if(loginState[2] && loginState[3] && loginState[4]) {
            if (loginState[3] !== loginState[4]) {
                setLoginStatus({
                    successful: false,
                    message: 'passwords must be the same'
                })
                return
            }
            const data = {login: loginState[2], password: loginState[3]}
            setLoginStatus({
                successful: true,
                message: 'please wait...'
            })
            axios.post('/register', data )
                .then(res => {
                    if (res.status === 208) {
                        setLoginStatus({
                            successful: false,
                            message: 'sorry, but this user exists yet'
                        })
                        return
                    }
                    setLoginState(['','','','',''])
                    setIsInputDisabled([false, false])
                    setLoginStatus({
                        successful: true,
                        message: 'you are successfully registered'
                    })
                })
                .catch(() => {
                    setLoginStatus({
                        successful: false,
                        message: 'Something went wrong'
                    })
                })
            return
        }

        // if some fields havn't been filled this message will be displayed
        setLoginStatus({
            message: 'please, fill all fields',
            successful: false
        })
    }

    if (props.isPopUpHidden) return null

    return(
        <>
            <div className={overlayClassname} onClick={closePopup}></div>
            <div className='pop-up-window' >
                <div onClick={closePopup} style={{height:'3rem'}}></div>
                <div className={`${popUpClassname} ${props.darkTheme ? 'pop-up-dark' : 'pop-up-light'}`} >
                    <div className='flex-center' >sign in</div>
                    <div>
                        <input
                            disabled={isInputDisabled[0]}
                            placeholder='Login'
                            className='pop-up-input'
                            type='text'
                            onChange={(e) => handleInput(e, 0)}
                            value={loginState[0]}
                        />
                    </div>
                    <div>
                        <input
                            disabled={isInputDisabled[0]}
                            placeholder='Password'
                            className='pop-up-input'
                            type='password'
                            onChange={(e) => handleInput(e, 1)}
                            value={loginState[1]}
                        />
                    </div>
                    <div className='or-register flex-center'>or</div>
                    <div className='flex-center'>sign up</div>
                    <div>
                        <input
                            disabled={isInputDisabled[1]}
                            placeholder='Login'
                            className='pop-up-input'
                            type='text'
                            onChange={(e) => handleInput(e, 2)}
                            value={loginState[2]}
                        />
                    </div>
                    <div>
                        <input
                            disabled={isInputDisabled[1]}
                            placeholder='Password'
                            className='pop-up-input'
                            type='password'
                            onChange={(e) => handleInput(e, 3)}
                            value={loginState[3]}
                        />
                    </div>
                    <div>
                        <input
                            disabled={isInputDisabled[1]}
                            placeholder='Confirm password'
                            className='pop-up-input'
                            type='password'
                            onChange={(e) => handleInput(e, 4)}
                            value={loginState[4]}
                        />
                    </div>
                    <div style={loginStatusStyle}>
                        {loginStatus.message}
                    </div>
                    <div className='flex-center'>
                        <button className='primary-button' onClick={confirmHandler}>Confirm</button>
                    </div>
                </div>
                <div onClick={closePopup} style={{height: '100%'}}></div>
            </div>
        </>
    )
}

const mapStateToProps = store => {
    return {
        darkTheme: store.darkTheme,
        isPopUpHidden: store.isPopUpHidden
    }
  }

const mapActionsToProps = dispatch => {
    return {
        userLogin: bindActionCreators(userLogin, dispatch),
        changePopUpDisplay: bindActionCreators(changePopUpDisplay, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(PopUp)
