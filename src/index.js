import axios from 'axios'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import './globalStyles.scss'
import { rootReducer } from './Store/rootReducer.js'
import MainComponent from './Components/mainComponent.jsx'

const store = createStore(rootReducer)

axios.interceptors.response.use(
  res => res,
  async err => {
    const status = err.response.status
    const url = err.config.url
    const config = err.config

    if (status === 401 || status === 403) {
      if (url === '/api/account/getNewAccessToken') return Promise.reject(err)
      await axios.get('/api/account/getNewAccessToken')
      return await axios.request(config)
    }
    return Promise.reject(err)
  }
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
