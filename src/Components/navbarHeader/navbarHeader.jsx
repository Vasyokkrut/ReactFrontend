import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'
import './styles.css'
import Dropdown from './dropdown'

function NavbarHeader(props) {

  let headerClassName = classNames(props.theme==='dark'?'darkHeader':'lightHeader')

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
    theme: store.theme
  }
}

export default connect(mapStateToProps, null)(NavbarHeader)
