import { Switch, Route } from 'react-router-dom'

import Music from './music/music.jsx'
import Friends from './friends/friends.jsx'
import WelcomePage from './WelcomePage.jsx'
import PostsList from './postsList/postsList.jsx'
import AccountSettings from './accountSettings/accountSettings.jsx'

function MiddleList() {
  return(
    <div className='middle-list' >
      <main>
        <Switch>
          <Route path='/userPosts/:username' component={PostsList} />
          <Route path='/accountSettings' component={AccountSettings} />
          <Route path='/music' component={Music} />
          <Route path='/friends' component={Friends} />
          <Route path='/' component={WelcomePage} />
        </Switch>
      </main>
    </div>
  )
}

export default MiddleList
