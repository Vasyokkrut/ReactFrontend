import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './styles.css'
import Dropdown from './dropdown'

function NavbarHeader({darkTheme, userName}) {

  const headerClassName = darkTheme ? 'darkHeader' : 'lightHeader'

  return(
    <header className={headerClassName} >
      <div className='navbar' >
        <div>
          <Link
            className={headerClassName}
            style={{textDecoration:'none'}}
            to='/'
          >
            Vasyokkrut
          </Link>
        </div>
        <Dropdown />
      </div>
    </header>
  )
}

const mapStateToProps = store => {
  return {
    userName: store.userName,
    darkTheme: store.darkTheme
  }
}

export default connect(mapStateToProps, null)(NavbarHeader)
