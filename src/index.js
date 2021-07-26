import axios from 'axios'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import './globalStyles.scss'
import store from './Store/store.js'
import MainComponent from './Components/mainComponent.jsx'
import { authenticationInterceptor } from './utilities.js'

axios.interceptors.response.use(
  res => res,
  authenticationInterceptor
)

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
