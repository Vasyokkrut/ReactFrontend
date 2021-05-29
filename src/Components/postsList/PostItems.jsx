import React from 'react'
import axios from 'axios'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Buttons from './Buttons'
import { userLogout } from '../../Store/account/actions.js'
import { changePopUpDisplay } from '../../Store/appearance/actions.js'
import { deleteUserPost, setUserPosts } from '../../Store/posts/actions.js'

class PostItems extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isDataLoaded: false, URLUserName: props.URLUserName}
  }

  componentDidMount() {
    axios.get(`/api/posts/getUserInfo/${this.props.URLUserName}`)
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
    if (prevProps.URLUserName !== this.props.URLUserName) {
      this.props.setUserName(null)
      this.setState({...this.state, isDataLoaded: false})

      axios.get(`/api/posts/getUserInfo/${this.props.URLUserName}`)
        .then(res => {
          const {userPosts, userName} = res.data
          this.props.setUserName(userName)
          this.props.setUserPosts(userPosts.reverse())
        })
        .catch(() => {
          this.props.setUserPosts(null)
        })
        .finally(() => {
          this.setState({isDataLoaded: true, URLUserName: this.props.URLUserName})
        })
    }
  }

  handleDeleteClick(fileName) {
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
    const PostClassName = classNames(
      'post-item',
      this.props.isDarkTheme ? 'post-item-dark' : 'post-item-light'
    )

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
    if(this.props.userPosts.length === 0 && this.props.userName !== this.props.URLUserName) {
      return (
        <div className='empty-post'>
          This user has not posts yet
        </div>
      )
    }

    // if user has not any posts this message will be displayed
    if(this.props.userPosts.length === 0) {
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
        const pictureURL = `/api/posts/getPostPicture/${this.state.URLUserName}/${item._id}`
        return (
          <div key={item._id} className={PostClassName}>
            <div className='post-title'>
              {item.title}
            </div>
            <div className='post-text' >
              {item.text}
            </div>
            <div className='flex-center post-picture-container'>
              <img src={pictureURL} alt='There is a beautiful car' className='post-picture' />
            </div>
            <Buttons
              pictureURL={pictureURL}
              item={item}
              handleDeleteClick={this.handleDeleteClick.bind(this)}
              isDeleteAvailable={this.props.URLUserName.toLowerCase() === this.props.userName?.toLowerCase()}
            />
          </div>
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
