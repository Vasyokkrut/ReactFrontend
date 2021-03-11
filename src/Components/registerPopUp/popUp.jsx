import axios from 'axios'
import classnames from 'classnames'
import { connect } from 'react-redux'
import React, { useState } from 'react'
import { bindActionCreators } from 'redux'

import './styles.css'
import { changePopUpDisplay, userLogin } from '../../Store/actions.js'

function PopUp(props) {
    const [loginState, setLoginState] = useState(['','','','',''])
    const [isInputDisabled, setIsInputDisabled] = useState([false, false])
    const [overlayClassname, setOverlayClassName] = useState(classnames('overlay', 'overlay-open'))
    const [popUpClassname, setPopUpClassName] = useState(classnames('modal-window', 'modal-window-opened'))

    function closePopup() {
        setTimeout(() => {
            props.changePopUpDisplay()
            setPopUpClassName(classnames('modal-window', 'modal-window-opened'))
            setOverlayClassName(classnames('overlay', 'overlay-open'))
        }, 200)
        setPopUpClassName(classnames('modal-window', 'modal-window-closed'))
        setOverlayClassName(classnames('overlay', 'overlay-close'))
    }

    function handleInput(e,idx) {
        const newState = [...loginState]
        newState[idx] = e.target.value
        if(idx === 0||idx === 1){
            setIsInputDisabled([false, true])
        } else {
            setIsInputDisabled([true, false])
        }
        if(newState.every(el => el === '')) {
            setIsInputDisabled([false, false])
        }
        setLoginState(newState)
    }

    function onClickHandle() {
        //checking if user is logging into website
        //by checking first and second fields
        if(loginState[0].trim() && loginState[1].trim()) {
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
            .catch(() => alert('wrong login or password'))
        //checking if user is making account
        //by checking third forth and fifth fields
        } else if(loginState[2].trim() && loginState[3].trim() && loginState[3] === loginState[4]) {
            const data = {login: loginState[2], password: loginState[3]}
            axios.post('/register', data )
            .then(res => {
                if (res.status===208) {
                    return alert('User exists yet')
                }
                setLoginState(['','','','',''])
                setIsInputDisabled([false, false])
                alert('you are successfully registered')
            })
        } else {
            alert('Entered wrong values!')
        }
    }

    if(props.hidden) return null

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
                    <div className='flex-center'>
                        <button className='primary-button' onClick={onClickHandle}>Confirm</button>
                    </div>
                </div>
                <div onClick={closePopup} style={{height:'100%'}}></div>
            </div>
        </>
    )
}

const mapStateToProps = store => {
    return {
        darkTheme: store.darkTheme,
        hidden: store.isPopUpHidden
    }
  }

const mapActionsToProps = dispatch => {
    return {
        userLogin: bindActionCreators(userLogin, dispatch),
        changePopUpDisplay: bindActionCreators(changePopUpDisplay, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(PopUp)
