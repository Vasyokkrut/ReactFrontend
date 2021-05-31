import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PostItem from './postItem.jsx'
import { userLogout } from '../../Store/account/actions.js'
import { changePopUpDisplay } from '../../Store/appearance/actions.js'
import { deleteUserPost, setUserPosts } from '../../Store/posts/actions.js'

class PostItems extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isDataLoaded: false, userNameFromURL: props.userNameFromURL}
  }

  componentDidMount() {
    axios.get(`/api/posts/getUserInfo/${this.props.userNameFromURL}`)
      .then(res => {
        const {userPosts, userName} = res.data
        this.props.setUserName(userName)
        this.props.setUserPosts(userPosts.reverse())
      })
      .catch(() => {
        this.props.setUserPosts(null)
      })
      .finally(() => {
        this.setState({...this.state, isDataLoaded: true})
      })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userNameFromURL !== this.props.userNameFromURL) {
      this.props.setUserName(null)
      this.setState({...this.state, isDataLoaded: false})

      axios.get(`/api/posts/getUserInfo/${this.props.userNameFromURL}`)
        .then(res => {
          const {userPosts, userName} = res.data
          this.props.setUserName(userName)
          this.props.setUserPosts(userPosts.reverse())
        })
        .catch(() => {
          this.props.setUserPosts(null)
        })
        .finally(() => {
          this.setState({isDataLoaded: true, userNameFromURL: this.props.userNameFromURL})
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
    // show nothing unless data is loaded to prevent flicker
    if(this.state.isDataLoaded === false) return <div className='account-name'>loading...</div>

    // if user doesn't exist this message will be displayed
    if(this.props.userPosts === null) {
      return (
        <div className='empty-post'>
          User doesn't exist
        </div>
      )
    }

    // if user has not any posts this message will be displayed
    if(!this.props.userPosts.length && this.props.userName?.toLowerCase() !== this.props.userNameFromURL?.toLowerCase()) {
      return (
        <div className='empty-post'>
          This user has not posts yet
        </div>
      )
    }

    // if user has not any posts this message will be displayed
    if(!this.props.userPosts.length) {
      return (
        <div className='empty-post'>
          Upload your own picture<br />
          using button above!
        </div>
      )
    }

    // if user has posts they will be displayed
    return(
      this.props.userPosts.map(item => {
        return (
          <PostItem
            key={item._id}
            item={item}
            userNameFromURL={this.state.userNameFromURL}
            sendDeleteRequest={this.sendDeleteRequest.bind(this)}
            isDeleteAvailable={this.props.userNameFromURL.toLowerCase() === this.props.userName?.toLowerCase()}
          />
        )
      })
    )
  }
}

const mapStateToProps = store => {
  return {
    userName: store.account.userName,
    userPosts: store.posts.userPosts,
    isDarkTheme: store.appearance.isDarkTheme
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

export default connect(mapStateToProps, mapActionsToProps)(PostItems)
