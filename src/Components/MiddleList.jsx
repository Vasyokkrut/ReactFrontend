import React from 'react';
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import WelcomePage from './WelcomePage.jsx'
import UserPostsList from './postsList/user/UserPostsList.jsx'
import PublicPostsList from './postsList/public/PublicPostsList.jsx'

function MiddleList(props) {
  return(
    <div className='PostsList'>
      <main>
        <Switch>
          <Route path='/publicPosts' component={PublicPostsList} />
          <Route path='/userPosts/:URLUserName' component={UserPostsList} />
          <Route path='/'>
            <WelcomePage
              TextColor={props.TextColor}
            />
          </Route>
        </Switch>
      </main>
    </div>
  )
}

const mapStateToProps = store => {
  return {
    isLoggedin:store.isLoggedin,
    theme: store.theme,
    userName: store.userName,
    TextColor: store.theme==='dark'?'white':'black'
  }
}

export default connect(mapStateToProps, null)(MiddleList)
