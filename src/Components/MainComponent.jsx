import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './navLists/styles.css'
import './postsLists/styles.css'
import PopUp from './popUp/popUp.jsx'
import MiddleList from './MiddleList.jsx'
import LeftList from './navLists/LeftNavList.jsx'
import RightList from './navLists/RightNavList.jsx'
import NavbarHeader from './navbarHeader/navbarHeader.jsx'
import { changeTheme, userLogin } from '../Store/actions.js'

class MainComponent extends React.Component {

  constructor(props) {
    super(props)
    document.body.className = props.isDarkTheme ? 'dark-body' : 'light-body'
    if(localStorage.getItem('isDarkTheme') === 'false') props.changeTheme()
  }

  componentDidMount() {
    const userName = localStorage.getItem('userName')
    if (userName) {
      const userJWT = localStorage.getItem('userJWT')
      this.props.userLogin({userName, userJWT})
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isDarkTheme !== this.props.isDarkTheme) {
      document.body.className = this.props.isDarkTheme ? 'dark-body' : 'light-body'
    }
  }

  render(){
    return(
      <>
        <noscript>You have to enable JS</noscript>
        <NavbarHeader />
        <PopUp />
        <div className='flex-center main-component'>
          <LeftList />
          <MiddleList />
          <RightList />
        </div>
      </>
    )
  }
}

const mapStateToProps = store => {
  return {
    isDarkTheme: store.isDarkTheme
  }
}

const mapActionsToProps = dispatch => {
  return {
    userLogin: bindActionCreators(userLogin, dispatch),
    changeTheme: bindActionCreators(changeTheme, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(MainComponent)
