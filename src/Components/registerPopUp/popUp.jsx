import React, { useState } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {changePopUpDisplay, addUserPost, userLogin} from '../../Store/actions.js'
import './styles.css'

function PopUp(props) {
    let [loginState, setLoginState] = useState(['','','','',''])
    let [isInputDisabled, setIsInputDisabled] = useState([false, false])
    let [overlayClassname, setOverlayClassName] = useState(classnames('overlay', 'overlayOpen'))
    let [popupClassname, setPopupClassName] = useState(classnames('modalWindow', 'modalWindowOpen'))

    function closePopup() {
        setTimeout(() => {
            props.changePopUpDisplay()
            setPopupClassName(classnames('modalWindow', 'modalWindowOpen'))
            setOverlayClassName(classnames('overlay', 'overlayOpen'))
        }, 200)
        setPopupClassName(classnames('modalWindow', 'modalWindowClose'))
        setOverlayClassName(classnames('overlay', 'overlayClose'))
    }

    function handleInput(e,idx) {
        let newState=[...loginState]
        newState[idx]=e.target.value
        if(idx===0||idx===1){
            setIsInputDisabled([false, true])
        } else {
            setIsInputDisabled([true, false])
        }
        if(newState[0]===''&&newState[1]===''&&newState[2]===''&&newState[3]===''&&newState[4]==='') {
            setIsInputDisabled([false, false])
        }
        setLoginState(newState)
    }

    function onClickHandle() {
        //checking if user is logging into website
        //by checking first and second fields
        if(loginState[0].trim()&&loginState[1].trim()) {
            let data = {login:loginState[0].trim(), password:loginState[1].trim()}
            axios.post('/login', data)
            .then(async res => {
                let JWTToken = res.data.JWTToken
                let a = await axios.get(`/api/getUserImages`, {headers:{Authorization: JWTToken}})
                let images=a.data.images
                for(let i=0;i<images.length;i++) {
                    props.addUserPost(images[i])
                }
                props.userLogin({username:loginState[0], JWTToken: JWTToken})
                localStorage.setItem('LoginData', JSON.stringify({login:loginState[0].trim(), password:loginState[1].trim()}))
                localStorage.setItem('JWTToken', JWTToken)
                closePopup()
                setTimeout(() => {
                    setLoginState(['','','','',''])
                    setIsInputDisabled([false, false])
                }, 200)
            })
            .catch(() => alert('wrong login or password'))
        //checking if user is making account
        //by checking third forth and fifth fields
        } else if(loginState[2].trim()&&loginState[3].trim()&&loginState[3]===loginState[4]) {
            let data = {login:loginState[2].trim(), password:loginState[3].trim()}
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
        <React.Fragment>
            <div className={overlayClassname} onClick={closePopup}></div>
            <div className='popupWindow' >
                <div onClick={closePopup} style={{height:'3rem'}}></div>
                <div className={`${popupClassname} ${props.background==='dark'?'popUpLight':'popUpDark'}`} style={{zIndex:999}}>
                    <div className='Flexible' >sign in</div>
                    <div>
                        <input
                            disabled={isInputDisabled[0]}
                            placeholder='Login'
                            className='popUpInput'
                            type='text'
                            onChange={(e) => handleInput(e,0)}
                            value={loginState[0]}
                        />
                    </div>
                    <div>
                        <input
                            disabled={isInputDisabled[0]}
                            placeholder='Password'
                            className='popUpInput'
                            type='password'
                            onChange={(e) => handleInput(e,1)}
                            value={loginState[1]}
                        />
                    </div>
                    <div className='or-register' style={{display:'flex', justifyContent:'center'}}>or</div>
                    <div className='Flexible'>sign up</div>
                    <div>
                        <input
                            disabled={isInputDisabled[1]}
                            placeholder='Login'
                            className='popUpInput'
                            type='text'
                            onChange={(e) => handleInput(e,2)}
                            value={loginState[2]}
                        />
                    </div>
                    <div>
                        <input
                            disabled={isInputDisabled[1]}
                            placeholder='Password'
                            className='popUpInput'
                            type='password'
                            onChange={(e) => handleInput(e,3)}
                            value={loginState[3]}
                        />
                    </div>
                    <div>
                        <input
                            disabled={isInputDisabled[1]}
                            placeholder='Confirm password'
                            className='popUpInput'
                            type='password'
                            onChange={(e) => handleInput(e,4)}
                            value={loginState[4]}
                        />
                    </div>
                    <div className='Flexible'>
                        <button className='BtnFullPicture' onClick={onClickHandle}>Confirm</button>
                    </div>
                </div>
                <div onClick={closePopup} style={{height:'100%'}}></div>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = store => {
    return {
        background: store.theme,
        hidden: store.popUpHidden,
        userName: store.userName
    }
  }

const mapActionsToProps = dispatch => {
    return {
        changePopUpDisplay: bindActionCreators(changePopUpDisplay, dispatch),
        userLogin: bindActionCreators(userLogin, dispatch),
        addUserPost: bindActionCreators(addUserPost, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(PopUp)
