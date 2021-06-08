import { Switch, Route } from 'react-router-dom'

import Posts from './posts/posts.jsx'
import Music from './music/music.jsx'
import Friends from './friends/friends.jsx'
import WelcomePage from './welcomePage/welcomePage.jsx'
import AccountSettings from './accountSettings/accountSettings.jsx'

function ContentRouter() {
  return(
    <main className='middle-list' >
      <Switch>
        <Route path='/accountSettings' component={AccountSettings} />
        <Route path='/userPosts/:username' component={Posts} />
        <Route path='/userPosts' component={Posts} />
        <Route path='/friends' component={Friends} />
        <Route path='/music' component={Music} />
        <Route path='/' component={WelcomePage} />
      </Switch>
    </main>
  )
}

export default ContentRouter
