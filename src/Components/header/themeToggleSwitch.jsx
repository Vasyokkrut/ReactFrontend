import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { changeTheme } from '../../Store/appearance/actions.js'

function ThemeToggleSwitch({isDarkTheme, changeTheme}) {

  function toggleTheme() {
    localStorage.setItem('isDarkTheme', isDarkTheme ? 'false' : 'true')
    changeTheme()
  }

  return (
    <div className='slider-container' >
      <label title='change theme' className='slider-label' >
        <input onChange={toggleTheme} checked={isDarkTheme} type='checkbox' className='slider-checkbox' />
        <span className='slider-switch' />
      </label>
      <span style={{fontSize: '1rem', marginLeft: '1rem'}} >{isDarkTheme ? 'dark' : 'light'}</span>
    </div>
  )
}

const mapStateToProps = store => {
  return {
    isDarkTheme: store.appearance.isDarkTheme
  }
}

const mapActionsToProps = dispatch => {
  return {
    changeTheme: bindActionCreators(changeTheme, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(ThemeToggleSwitch)
