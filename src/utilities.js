import axios from 'axios'
import store from './Store/store.js'
import { userLogout } from './Store/account/actions.js'
import { resetAudioPlayer } from './Store/music/actions.js'
import { changePopUpDisplay } from './Store/appearance/actions.js'

// this function will be called if the logout was triggered by user
function softLogout() {
  axios.get('/api/account/logout')
    .then(res => {
      localStorage.removeItem('userName')
      store.dispatch(userLogout())
      store.dispatch(resetAudioPlayer())
    })
}

// this function will be called
// if the logout was triggered by authentication error
function hardLogout() {
  localStorage.removeItem('userName')
  store.dispatch(userLogout())
  store.dispatch(resetAudioPlayer())
  store.dispatch(changePopUpDisplay())
}

// if access token has been denied,
// this interceptor will try to gain new one
async function authenticationInterceptor(err) {
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

export { softLogout, hardLogout, authenticationInterceptor }
