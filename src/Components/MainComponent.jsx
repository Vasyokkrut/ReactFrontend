import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './navLists/styles.css'
import './postsList/styles.css'
import MiddleList from './MiddleList.jsx'
import PopUp from './registerPopUp/popUp.jsx'
import LeftList from './navLists/LeftNavList.jsx'
import RightList from './navLists/RightNavList.jsx'
import NavbarHeader from './navbarHeader/navbarHeader.jsx'
import { changeTheme, userLogin } from '../Store/actions.js'

class MainComponent extends React.Component {

  constructor(props) {
    super(props)
    document.body.className = props.theme
    if(localStorage.getItem('theme') === 'light') props.changeTheme()
  }

  async componentDidMount() {

    let LoginData = localStorage.getItem('LoginData')
    if(LoginData !== null) {
      let JWTToken = localStorage.getItem('JWTToken')
      LoginData = JSON.parse(LoginData)
      this.props.userLogin({username:LoginData.login, JWTToken: JWTToken})
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.theme !== this.props.theme) {
      document.body.className = this.props.theme
    }
  }

  render(){
    return(
      <>
        <noscript>You have to enable JS</noscript>
        <NavbarHeader />
        <PopUp />
        <div className='Flexible main-component'>
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
    theme: store.theme
  }
}
  
const mapActionsToProps = dispatch => {
  return {
    userLogin: bindActionCreators(userLogin, dispatch),
    changeTheme: bindActionCreators(changeTheme, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(MainComponent)
