import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { mainReducer } from './Store/reducers.js'
import MainComponent from './Components/MainComponent.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { Switch, Route } from 'react-router-dom'
import FullPicture from './Components/FullPicture.jsx'
import './globalStyles.css'

let store = createStore(mainReducer)

function MainApp() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Provider store={store}>
          <Switch>
            <Route path='/api/getImage' component={FullPicture} />
            <Route path='/api/getUserImage' component={FullPicture} />
            <Route path='/'>
              <MainComponent />
            </Route>
          </Switch>
        </Provider>
      </BrowserRouter>
    </CookiesProvider>
  )
}

ReactDOM.render(
  <MainApp />,
  document.getElementById('root')
);
