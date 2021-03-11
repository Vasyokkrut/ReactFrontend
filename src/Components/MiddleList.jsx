import React from 'react'
import { Switch, Route } from 'react-router-dom'

import WelcomePage from './WelcomePage.jsx'
import UserPostsList from './postsList/user/UserPostsList.jsx'
import AccountSettings from './accountSettings/accountSettings.jsx'
import PublicPostsList from './postsList/public/PublicPostsList.jsx'

function MiddleList() {
  return(
    <div className='middle-list' >
      <main>
        <Switch>
          <Route path='/publicPosts' component={PublicPostsList} />
          <Route path='/userPosts/:URLUserName' component={UserPostsList} />
          <Route path='/accountSettings' component={AccountSettings} />
          <Route path='/' component={WelcomePage} />
        </Switch>
      </main>
    </div>
  )
}

export default MiddleList
