import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './navLists/styles.scss'
import './postsLists/styles.scss'
import PopUp from './popUp/popUp.jsx'
import MiddleList from './MiddleList.jsx'
import LeftList from './navLists/LeftNavList.jsx'
import RightList from './navLists/RightNavList.jsx'
import NativeAudioElement from './music/nativeAudioElement.jsx'
import NavbarHeader from './navbarHeader/navbarHeader.jsx'
import { changeTheme, userLogin } from '../Store/actions.js'

class MainComponent extends React.Component {

  constructor(props) {
    super(props)
    document.body.className = props.isDarkTheme ? 'dark-body' : 'light-body'
    if(localStorage.getItem('isDarkTheme') === 'false') props.changeTheme()

    const userJWT = localStorage.getItem('userJWT')
    const userName = localStorage.getItem('userName')
    if (userName && userJWT) {
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
        <NativeAudioElement />
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
