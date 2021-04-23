import { Switch, Route } from 'react-router-dom'

import MyMusic from './music/myMusic.jsx'
import WelcomePage from './WelcomePage.jsx'
import UserPostsList from './postsLists/user/UserPostsList.jsx'
import AccountSettings from './accountSettings/accountSettings.jsx'
import PublicPostsList from './postsLists/public/PublicPostsList.jsx'

function MiddleList() {
  return(
    <div className='middle-list' >
      <main>
        <Switch>
          <Route path='/publicPosts' component={PublicPostsList} />
          <Route path='/userPosts/:URLUserName' component={UserPostsList} />
          <Route path='/accountSettings' component={AccountSettings} />
          <Route path='/myMusic' component={MyMusic} />
          <Route path='/' component={WelcomePage} />
        </Switch>
      </main>
    </div>
  )
}

export default MiddleList
