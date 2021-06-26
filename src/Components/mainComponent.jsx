import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './navLists/styles.scss'
import PopUp from './popUp/popUp.jsx'
import Header from './header/header.jsx'
import ContentRouter from './contentRouter.jsx'
import LeftList from './navLists/leftNavList.jsx'
import RightList from './navLists/rightNavList.jsx'
import { userLogin } from '../Store/account/actions.js'
import { changeTheme } from '../Store/appearance/actions.js'
import NativeAudioElement from './music/nativeAudioElement.jsx'
import { setMusicVolume } from '../Store/music/actions.js'

class MainComponent extends Component {

  constructor(props) {
    super(props)
    document.body.className = props.isDarkTheme ? 'dark-body' : 'light-body'
    if(localStorage.getItem('isDarkTheme') === 'false') props.changeTheme()

    const userName = localStorage.getItem('userName')
    if (userName) this.props.userLogin({userName})

    const musicVolume = localStorage.getItem('musicVolume')
    if (musicVolume !== null && !isNaN(+musicVolume)) this.props.setMusicVolume(+musicVolume)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isDarkTheme !== this.props.isDarkTheme) {
      document.body.className = this.props.isDarkTheme ? 'dark-body' : 'light-body'
    }
  }

  render(){
    return(
      <>
        <Header />
        <NativeAudioElement />
        <PopUp />
        <div className='flex-center main-component'>
          <LeftList />
          <ContentRouter />
          <RightList />
        </div>
      </>
    )
  }
}

const mapStateToProps = store => {
  return {
    isDarkTheme: store.appearance.isDarkTheme
  }
}

const mapActionsToProps = dispatch => {
  return {
    userLogin: bindActionCreators(userLogin, dispatch),
    changeTheme: bindActionCreators(changeTheme, dispatch),
    setMusicVolume: bindActionCreators(setMusicVolume, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(MainComponent)
