import axios from 'axios'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './styles.scss'
import PostItem from './postItem.jsx'
import AddPostForm from './addPostForm.jsx'
import { userLogout } from '../../Store/account/actions.js'
import { changePopUpDisplay } from '../../Store/appearance/actions.js'
import { deleteUserPost, setUserPosts } from '../../Store/posts/actions.js'

class Posts extends Component {
  constructor(props) {
    super(props)

    // requestedUserName is case-correct form of props.match.params.username
    this.state = {
      isDataLoaded: false,
      requestedUserName: null
    }
  }

  componentDidMount() {
    axios.get(`/api/posts/getUserInfo/${this.props.match.params.username}`)
      .then(res => {
        this.props.setUserPosts(res.data.userPosts.reverse())
        this.setState({
          isDataLoaded: true,
          requestedUserName: res.data.userName
        })
      })
      .catch(() => {
        this.setState({
          isDataLoaded: true,
          requestedUserName: null
        })
      })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.username !== this.props.match.params.username) {
      this.setState({
        isDataLoaded: false,
        requestedUserName: null
      })

      axios.get(`/api/posts/getUserInfo/${this.props.match.params.username}`)
        .then(res => {
          this.props.setUserPosts(res.data.userPosts.reverse())
          this.setState({
            isDataLoaded: true,
            requestedUserName: res.data.userName
          })
        })
        .catch(() => {
          this.setState({
            isDataLoaded: true,
            requestedUserName: null
          })
        })
    }
  }

  sendDeleteRequest(fileName) {
    const config = {
      data: {
        delete: fileName,
        userName: this.props.userName
      }
    }

    axios.delete('/api/posts/deletePost', config)
      .then(res => this.props.deleteUserPost(fileName))
      .catch(err => {
        const status = err.response.status
        if (status === 401 || status === 403) {
          localStorage.removeItem('userName')
          this.props.userLogout()
          this.props.changePopUpDisplay()
        } else {
          alert('error happened :(')
        }
      })
  }

  render() {
    // if user will try to access root route
    // such as '/userposts' or '/userposts/'
    // this message will notify the user
    if (!this.props.match.params.username) {
      return (
        <div style={{fontSize: '2rem', textAlign: 'center'}}>
          your query is empty<br />
          try to search user like this:<br />
          userPosts/user
        </div>
      )
    }

    // show nothing unless data is loaded to prevent flicker
    if (this.state.isDataLoaded === false) return <div className='account-name'>loading...</div>

    // if user doesn't exist this message will be displayed
    if (this.state.requestedUserName === null) {
      return (
        <div className='empty-post'>
          User doesn't exist
        </div>
      )
    }

    // if found user has no posts message will appear
    // but if found user is the same as logged in user
    // there will be a button above to add new post
    if (!this.props.userPosts.length) {
      if (this.props.userName !== this.state.requestedUserName) {
        return (
          <>
            <div className='account-name'>
              {this.state.requestedUserName + ' posts'}
            </div>
            <div className='empty-post'>
              This user has not posts yet
            </div>
          </>
        )
      }
      return (
        <>
          <div className='account-name'>
            {this.state.requestedUserName + ' posts'}
          </div>
          <AddPostForm requestedUserName={this.state.requestedUserName} />
          <div className='empty-post'>
            Upload your own picture<br />
            using button above!
          </div>
        </>
      )
    }

    // if user has posts they will be displayed
    return(
      <>
        <div className='account-name'>
          {this.state.requestedUserName + ' posts'}
        </div>
        <AddPostForm requestedUserName={this.state.requestedUserName} />
        {this.props.userPosts.map(item => {
          return (
            <PostItem
              key={item._id}
              item={item}
              userName={this.state.requestedUserName}
              sendDeleteRequest={this.sendDeleteRequest.bind(this)}
              isDeleteAvailable={this.state.requestedUserName === this.props.userName}
            />
          )
        })}
      </>
    )
  }
}

const mapStateToProps = store => {
  return {
    userName: store.account.userName,
    userPosts: store.posts.userPosts
  }
}

const mapActionsToProps = dispatch => {
  return {
    userLogout: bindActionCreators(userLogout, dispatch),
    setUserPosts: bindActionCreators(setUserPosts, dispatch),
    deleteUserPost: bindActionCreators(deleteUserPost, dispatch),
    changePopUpDisplay: bindActionCreators(changePopUpDisplay, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Posts)
