import { Switch, Route } from 'react-router-dom'

import MyMusic from './music/myMusic.jsx'
import Friends from './friends/friends.jsx'
import WelcomePage from './WelcomePage.jsx'
import PostsList from './postsList/PostsList.jsx'
import AccountSettings from './accountSettings/accountSettings.jsx'

function MiddleList() {
  return(
    <div className='middle-list' >
      <main>
        <Switch>
          <Route path='/userPosts/:URLUserName' component={PostsList} />
          <Route path='/accountSettings' component={AccountSettings} />
          <Route path='/myMusic' component={MyMusic} />
          <Route path='/friends' component={Friends} />
          <Route path='/' component={WelcomePage} />
        </Switch>
      </main>
    </div>
  )
}

export default MiddleList
