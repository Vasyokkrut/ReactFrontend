import React from 'react';
import WelcomePage from './WelcomePage.jsx'
import { Switch, Route } from 'react-router-dom'
import ChangeThemeButton from './buttons/changeThemeButton.jsx'
import MainList from './postsList/PostsList.jsx'
import LoginFormPopup from './buttons/OpenPopUpButton.jsx'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeTheme } from '../Store/actions.js'

class PostsList extends React.Component {

    render() {
        this.TextColor=this.props.theme==='dark'?'white':'black'
        return(
            <div className='PostsList'>
                <div>
                    <div style={{color:this.TextColor}} className='TextNode AccName'>
                    {this.props.isLoggedin?`${this.props.userName} posts`:'Public posts'}
                    </div>
                </div>
                <LoginFormPopup
                    isLoggedin={this.props.isLoggedin}
                />
                <ChangeThemeButton
                    ChangeTheme={this.props.changeTheme}
                    theme={this.props.theme}
                />
                <main>
                    <Switch>
                        <Route path='/upload'>
                            <MainList
                                TextColor={this.TextColor}
                            />
                        </Route>
                        <Route path='/'>
                            <WelcomePage
                                TextColor={this.TextColor}
                            />
                        </Route>
                    </Switch>
                </main>
                </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        isLoggedin:store.isLoggedin,
        userPosts: store.userPosts,
        theme: store.theme,
        posts: store.posts,
        userName: store.userName
    }
  }

const mapActionsToProps = dispatch => {
    return {
        changeTheme: bindActionCreators(changeTheme, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(PostsList)
