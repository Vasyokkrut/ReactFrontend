import LeftList from './navLists/LeftNavList.jsx'
import RightList from './navLists/RightNavList.jsx'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import axios from 'axios'
import PostsList from './MiddleList.jsx'
import PopUp from './registerPopUp/popUp.jsx'
import NavbarHeader from './navbarHeader/navbarHeader.jsx'
import universalCookie from 'universal-cookie'
import {changeTheme, addPost, userLogin, addUserPost}
  from '../Store/actions.js'

class MainComponent extends React.Component {

  async componentDidMount() {
    let cookie = new universalCookie()
    if(cookie.get('theme')==='light') this.props.changeTheme()
    let LoginData = localStorage.getItem('LoginData')
    if(LoginData!==null) {
      let JWTToken = localStorage.getItem('JWTToken')
      LoginData = JSON.parse(LoginData)
      this.props.userLogin({username:LoginData.login, JWTToken: JWTToken})
      let b = await axios.get(`/api/getUserImages`, {headers:{'Authorization': JWTToken}})
      let images=b.data.images
      for(let i=0;i<images.length;i++) {
        this.props.addUserPost(images[i])
      }
    }

    let a = await axios.get('/api/getImages')
    let images=a.data.images
    for(let i=0;i<images.length;i++) {
      this.props.addPost(images[i])
    }
  }

  render(){
    document.body.className = this.props.theme
    this.TextColor=this.props.theme==='dark'?'white':'black'
    return(
      <React.Fragment>
        <noscript>You have to enable JS</noscript>
        <NavbarHeader />
        <PopUp />
        <div className='Flexible main-component'>
          <LeftList TextColor={this.TextColor} />
          <PostsList />
          <RightList TextColor={this.TextColor} />
        </div>
      </React.Fragment>
    )
  }
}
  
const mapStateToProps = store => {
  return {
    theme: store.theme,
    isLoggedin: store.isLoggedin,
    userName: store.userName
  }
}
  
const mapActionsToProps = dispatch => {
  return {
    changeTheme: bindActionCreators(changeTheme, dispatch),
    addPost: bindActionCreators(addPost, dispatch),
    userLogin: bindActionCreators(userLogin,dispatch),
    addUserPost: bindActionCreators(addUserPost,dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(MainComponent)
