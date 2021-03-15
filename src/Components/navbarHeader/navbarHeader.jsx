import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './styles.css'
import Dropdown from './dropdown'

function NavbarHeader({isDarkTheme}) {

  const headerClassName = isDarkTheme ? 'dark-header' : 'light-header'

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
    isDarkTheme: store.isDarkTheme
  }
}

export default connect(mapStateToProps, null)(NavbarHeader)
