import React from 'react'
import { Link } from 'react-router-dom'
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
            <div>{props.isLoggedin?props.userName:'You could log in'}</div>
          </div>
        </header>
    )
}

export default NavbarHeader