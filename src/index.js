import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'

import './globalStyles.css'
import { mainReducer } from './Store/reducers.js'
import FullPicture from './Components/FullPicture.jsx'
import MainComponent from './Components/MainComponent.jsx'

let store = createStore(mainReducer)

function MainApp() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route path='/api/getImage' component={FullPicture} />
          <Route path='/api/getUserImage' component={FullPicture} />
          <Route path='/' component={MainComponent} />
        </Switch>
      </Provider>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <MainApp />,
  document.getElementById('root')
);
