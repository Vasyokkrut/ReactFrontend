import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useState, useEffect } from 'react'

import './styles.scss'
import PostItem from './postItem.jsx'
import AddPostForm from './addPostForm.jsx'
import { hardLogout } from '../../utilities.js'
import { deleteUserPost, setUserPosts } from '../../Store/posts/actions.js'

function useWindowWidth() {
  const [width, setWidth] = useState(document.body.offsetWidth)

  useEffect(() => {
    function updateWidth() {
      setWidth(document.body.offsetWidth)
    }
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  return width
}

function Posts({
  match,
  userName,
  userPosts,
  setUserPosts,
  deleteUserPost
}) {
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [requestedUserName, setRequestedUserName] = useState(false)
  const windowWidth = useWindowWidth()

  useEffect(() => {
    setIsDataLoaded(false)

    axios.get(`/api/posts/getUserInfo/${match.params.username}`)
      .then(res => {
        setUserPosts(res.data.userPosts.reverse())
        setIsDataLoaded(true)
        setRequestedUserName(res.data.userName)
      })
      .catch(() => {
        setIsDataLoaded(true)
        setRequestedUserName(null)
      })
  }, [match.params.username, setUserPosts])

  function sendDeleteRequest(fileName) {
    const config = {
      data: {
        delete: fileName,
        userName: userName
      }
    }

    axios.delete('/api/posts/deletePost', config)
      .then(res => deleteUserPost(fileName))
      .catch(err => {
        const status = err.response.status
        if (status === 401 || status === 403) {
          hardLogout()
        }
      })
  }

  // if user will try to access root route
  // such as '/userposts' or '/userposts/'
  // this message will notify the user
  if (!match.params.username) {
    return (
      <div style={{fontSize: '2rem', textAlign: 'center'}}>
        your query is empty<br />
        try to search user like this:<br />
        userPosts/user
      </div>
    )
  }

  // show nothing unless data is loaded to prevent flicker
  if (!isDataLoaded) return <div className='account-name'>loading...</div>

  // if user doesn't exist this message will be displayed
  if (!requestedUserName) {
    return (
      <div className='empty-post'>
        User doesn't exist
      </div>
    )
  }

  // if found user has no posts message will appear
  // but if found user is the same as logged in user
  // there will be a button above to add new post
  if (!userPosts.length) {
    if (userName !== requestedUserName) {
      return (
        <>
          <div className='account-name'>
            {requestedUserName + ' posts'}
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
          {requestedUserName + ' posts'}
        </div>
        <AddPostForm requestedUserName={requestedUserName} />
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
        {requestedUserName + ' posts'}
      </div>
      <AddPostForm requestedUserName={requestedUserName} />
      {userPosts.map(item => {
        return (
          <PostItem
            key={item._id}
            item={item}
            windowWidth={windowWidth}
            userName={requestedUserName}
            sendDeleteRequest={sendDeleteRequest}
            isDeleteAvailable={requestedUserName === userName}
          />
        )
      })}
    </>
  )
}

const mapStateToProps = store => {
  return {
    userName: store.account.userName,
    userPosts: store.posts.userPosts
  }
}

const mapActionsToProps = dispatch => {
  return {
    setUserPosts: bindActionCreators(setUserPosts, dispatch),
    deleteUserPost: bindActionCreators(deleteUserPost, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Posts)
