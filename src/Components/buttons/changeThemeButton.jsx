import React from 'react'
import {useCookies} from 'react-cookie'
import './styles.css'

function ChangeThemeBtn(props) {
    let [cookie, setCookie] = useCookies()

    function setCookieHandler() {
        if(cookie.theme===undefined) {
            setCookie('theme', props.theme, {path:'/', expires: new Date(`December 17, ${(new Date()).getFullYear()+100} 03:24:00`)})
        }
        setCookie('theme', props.theme==='dark'?'light':'dark', {path:'/', expires: new Date(`December 17, ${(new Date()).getFullYear()+100} 03:24:00`)})
    }

    return(
        <div className='Flexible'>
            <button
              className='button button1'
              onClick={() => {props.ChangeTheme(); setCookieHandler()}}
            >
                Change theme
            </button>
        </div>
    )
}

export default ChangeThemeBtn