import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import MiddleList from './MiddleList.jsx'
import PopUp from './registerPopUp/popUp.jsx'
import LeftList from './navLists/LeftNavList.jsx'
import RightList from './navLists/RightNavList.jsx'
import NavbarHeader from './navbarHeader/navbarHeader.jsx'
import {changeTheme, setPosts, userLogin, addUserPost}
  from '../Store/actions.js'

class MainComponent extends React.Component {

  async componentDidMount() {
    if(localStorage.getItem('theme')==='light') this.props.changeTheme()

    let LoginData = localStorage.getItem('LoginData')
    if(LoginData!==null) {
      let JWTToken = localStorage.getItem('JWTToken')
      LoginData = JSON.parse(LoginData)
      this.props.userLogin({username:LoginData.login, JWTToken: JWTToken})
    }
  }

  render(){
    document.body.className = this.props.theme
    return(
      <React.Fragment>
        <noscript>You have to enable JS</noscript>
        <NavbarHeader />
        <PopUp />
        <div className='Flexible main-component'>
          <LeftList TextColor={this.props.TextColor} userName={this.props.userName} />
          <MiddleList />
          <RightList TextColor={this.props.TextColor} isLoggedin={this.props.isLoggedin} />
        </div>
      </React.Fragment>
    )
  }
}
  
const mapStateToProps = store => {
  return {
    theme: store.theme,
    isLoggedin: store.isLoggedin,
    userName: store.userName,
    TextColor: store.theme==='dark'?'white':'black'
  }
}
  
const mapActionsToProps = dispatch => {
  return {
    changeTheme: bindActionCreators(changeTheme, dispatch),
    setPosts: bindActionCreators(setPosts, dispatch),
    userLogin: bindActionCreators(userLogin, dispatch),
    addUserPost: bindActionCreators(addUserPost, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(MainComponent)
