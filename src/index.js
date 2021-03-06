import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import './globalStyles.scss'
import { mainReducer } from './Store/reducers.js'
import MainComponent from './Components/MainComponent.jsx'

const store = createStore(mainReducer)

function MainApp() {
  return (
    <BrowserRouter>
      <Provider store={store}>
          <MainComponent />
      </Provider>
    </BrowserRouter>
  )
}

ReactDOM.render(<MainApp />, document.getElementById('root'))
