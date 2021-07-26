import { connect } from 'react-redux'
import { useEffect, StrictMode } from 'react'

import './navLists/styles.scss'
import PopUp from './popUp/popUp.jsx'
import Header from './header/header.jsx'
import ContentRouter from './contentRouter.jsx'
import LeftList from './navLists/leftNavList.jsx'
import RightList from './navLists/rightNavList.jsx'
import BottomNavList from './navLists/bottomNavList.jsx'
import NativeAudioElement from './music/nativeAudioElement.jsx'

function MainComponent({isDarkTheme}) {
  useEffect(() => {
    document.body.className = isDarkTheme ? 'dark-body' : 'light-body'
  }, [isDarkTheme])

  return(
    <StrictMode>
      <Header />
      <NativeAudioElement />
      <PopUp />
      <div className='main-component'>
        <LeftList />
        <ContentRouter />
        <RightList />
      </div>
      <BottomNavList />
    </StrictMode>
  )
}

const mapStateToProps = store => {
  return {
    isDarkTheme: store.appearance.isDarkTheme
  }
}

export default connect(mapStateToProps)(MainComponent)
