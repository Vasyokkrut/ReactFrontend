import axios from 'axios'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import React, { useEffect, useRef, useState } from 'react'

import './styles.scss'
import { userLogin } from '../../Store/account/actions.js'
import { changePopUpDisplay } from '../../Store/appearance/actions.js'

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

  // class names for overlay and pop up
  const [componentsClassNames, setComponentsClassNames] = useState({
    popUp: 'pop-up pop-up-open',
  overlay: 'overlay overlay-open'
  })

  // for first render we shouldn't reset pop up inputs state
  // so this useRef turns off useEffect on first render
  const firstRender = useRef(true)

  // when user toggles pop up display, it should be clean
  // so we should reset the state of entire pop up
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    setLoginState(['','','','',''])
    setIsInputDisabled([false, false])
    setLoginStatus({message: '', successful: null})
  }, [props.isPopUpHidden])

  const buttonClassName = classnames(
    'primary-button',
    props.isDarkTheme ? 'primary-button-dark' : 'primary-button-light'
  )

  const popUpInputClassName = classnames(
    'pop-up-input',
    props.isDarkTheme ? 'pop-up-input-dark' : 'pop-up-input-light'
  )

  const popUpStyle = {
    backgroundColor: props.isDarkTheme ? '#222' : '#eee'
  }

  const popUpCloseClassName = classnames(
    'pop-up-hide',
    props.isDarkTheme ? 'pop-up-hide-dark' : 'pop-up-hide-light'
  )

  // styles for status message that is placed above the confirmation button
  const loginStatusStyle = {
    height: '2rem',
    fontSize: '1.5rem',
    textAlign: 'center',
    color: loginStatus.successful ? 'green' : 'red'
  }

  const lineClassName = classnames(
    'flex-center',
    'or-register',
    props.isDarkTheme ? 'or-register-dark' : 'or-register-light'
  )

  // this function switches class names for pop up and overlay
  // new class names trigger keyframes animations for closing pop up and overlay
  function closePopup() {
    setComponentsClassNames({
      popUp: 'pop-up pop-up-close',
      overlay: 'overlay overlay-close'
    })

    setTimeout(() => {
      props.changePopUpDisplay()
      setComponentsClassNames({
        popUp: 'pop-up pop-up-open',
        overlay: 'overlay overlay-open'
      })
    }, 200)
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
      axios.post('/api/account/login', data)
        .then(res => {
          props.userLogin({userName: loginState[0]})
          localStorage.setItem('userName', loginState[0])
          closePopup()
        })
        .catch(err => {
          const status = err.response.status
          if (status === 400 || status === 404) {
            setLoginStatus({
              successful: false,
              message: 'wrong login or password'
            })
          } else {
            setLoginStatus({
              successful: false,
              message: 'something went wrong'
            })
          }
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
      const data = {userName: loginState[2], password: loginState[3]}
      setLoginStatus({
        successful: true,
        message: 'please wait...'
      })
      axios.post('/api/account/register', data )
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
      successful: false,
      message: 'please, fill all fields'
    })
  }

  if (props.isPopUpHidden) return null

  return(
    <>
      <div className={componentsClassNames.overlay} onClick={closePopup}></div>
      <div className={componentsClassNames.popUp} style={popUpStyle} >
        <button className={popUpCloseClassName} onClick={closePopup} >&#10006;</button>
        <div>sign in</div>
        <div>
          <input
            disabled={isInputDisabled[0]}
            placeholder='Login'
            className={popUpInputClassName}
            onKeyDown={event => {if (event.key === 'Enter') confirmHandler()}}
            type='text'
            onChange={(e) => handleInput(e, 0)}
            value={loginState[0]}
          />
        </div>
        <div>
          <input
            disabled={isInputDisabled[0]}
            placeholder='Password'
            className={popUpInputClassName}
            type='password'
            onChange={(e) => handleInput(e, 1)}
            onKeyDown={event => {if (event.key === 'Enter') confirmHandler()}}
            value={loginState[1]}
          />
        </div>
        <div className={lineClassName} >or</div>
        <div style={{textAlign: 'center'}} >sign up</div>
        <div>
          <input
            disabled={isInputDisabled[1]}
            placeholder='Login'
            className={popUpInputClassName}
            type='text'
            onChange={(e) => handleInput(e, 2)}
            onKeyDown={event => {if (event.key === 'Enter') confirmHandler()}}
            value={loginState[2]}
          />
        </div>
        <div>
          <input
            disabled={isInputDisabled[1]}
            placeholder='Password'
            className={popUpInputClassName}
            type='password'
            onChange={(e) => handleInput(e, 3)}
            onKeyDown={event => {if (event.key === 'Enter') confirmHandler()}}
            value={loginState[3]}
          />
        </div>
        <div>
          <input
            disabled={isInputDisabled[1]}
            placeholder='Confirm password'
            className={popUpInputClassName}
            type='password'
            onChange={(e) => handleInput(e, 4)}
            onKeyDown={event => {if (event.key === 'Enter') confirmHandler()}}
            value={loginState[4]}
          />
        </div>
        <div style={loginStatusStyle}>
          {loginStatus.message}
        </div>
        <div className='flex-center'>
          <button className={buttonClassName} onClick={confirmHandler}>Confirm</button>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = store => {
  return {
    isDarkTheme: store.appearance.isDarkTheme,
    isPopUpHidden: store.appearance.isPopUpHidden
  }
}

const mapActionsToProps = dispatch => {
  return {
    userLogin: bindActionCreators(userLogin, dispatch),
    changePopUpDisplay: bindActionCreators(changePopUpDisplay, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(PopUp)
