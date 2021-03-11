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
    document.body.className = props.darkTheme ? 'dark-body' : 'light-body'
    if(localStorage.getItem('darkTheme') === 'false') props.changeTheme()
  }

  componentDidMount() {
    const userName = localStorage.getItem('userName')
    if (userName) {
      const userJWT = localStorage.getItem('userJWT')
      this.props.userLogin({userName, userJWT})
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.darkTheme !== this.props.darkTheme) {
      document.body.className = this.props.darkTheme ? 'dark-body' : 'light-body'
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
    darkTheme: store.darkTheme
  }
}
  
const mapActionsToProps = dispatch => {
  return {
    userLogin: bindActionCreators(userLogin, dispatch),
    changeTheme: bindActionCreators(changeTheme, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(MainComponent)
