import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import './globalStyles.scss'
import { rootReducer } from './Store/rootReducer.js'
import MainComponent from './Components/MainComponent.jsx'

const store = createStore(rootReducer)

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
