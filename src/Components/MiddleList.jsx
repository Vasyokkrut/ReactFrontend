import React from 'react';
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import WelcomePage from './WelcomePage.jsx'
import PostsList from './postsList/PostsList.jsx'

function MiddleList(props) {
  return(
    <div className='PostsList'>
      <div>
        <div style={{color:props.TextColor}} className='TextNode AccName'>
          {props.isLoggedin?`${props.userName} posts`:'Public posts'}
        </div>
      </div>
      <main>
        <Switch>
          <Route path='/upload' component={PostsList} />
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
