import axios from 'axios'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { useEffect, useState } from 'react'

import { userLogout } from '../../Store/account/actions.js'
import { changePopUpDisplay } from '../../Store/appearance/actions.js'

function FriendItem({isDarkTheme, friend, userLogout, changePopUpDisplay}) {
  const [isDeleted, setIsDeleted] = useState(false)

  const friendItemClassName = classnames(
    'friend-item',
    isDarkTheme ? 'friend-item-dark' : 'friend-item-light'
  )

  const clickableItemClassName = classnames(
    'clickable-item',
    isDarkTheme ? 'clickable-item-dark' : 'clickable-item-light'
  )

  function deleteFriend() {
    const config = {
      data: friend
    }
    axios.delete('/api/friends/deleteFriend', config)
      .then(res => setIsDeleted(true))
      .catch(err => {
        const status = err.response.status
        if (status === 401 || status === 403) {
          axios.get('/api/account/getNewAccessToken')
            .then(res => axios.delete('/api/friends/deleteFriend', config))
            .then(res => setIsDeleted(true))
            .catch(err => {
              const status = err.response.status
              if (status === 401 || status === 403) {
                localStorage.removeItem('userName')
                userLogout()
                changePopUpDisplay()
              }
            })
        }
      })
  }

  if (isDeleted) return null

  return (
    <div className={friendItemClassName} >
      <Link to={`/userPosts/${friend.name}`} className='friend-item-name' >{friend.name}</Link>
      <div className='friend-item-options' >
        <Link to={`/userPosts/${friend.name}`} className={clickableItemClassName} >view profile</Link>
        <button className={clickableItemClassName} onClick={deleteFriend} >delete friend</button>
      </div>
    </div>
  )
}

function FriendsList({isDarkTheme, userName, userLogout, changePopUpDisplay}) {
  const [friends, setFriends] = useState([])
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    axios.get('/api/friends/getFriends')
      .then(res => {
       setFriends(res.data)
       setIsDataLoaded(true)
      })
      .catch(err => {
        const status = err.response.status
        if (status === 401 || status === 403) {
          axios.get('/api/account/getNewAccessToken')
            .then(res => axios.get('/api/friends/getFriends'))
            .then(res => {
              setFriends(res.data)
              setIsDataLoaded(true)
            })
            .catch(err => {
              const status = err.response.status
              if (status === 401 || status === 403) {
                localStorage.removeItem('userName')
                userLogout()
                changePopUpDisplay()
              }
            })
        }
      })
  }, [userName, userLogout, changePopUpDisplay])

  if (!isDataLoaded) return <div className='notification' >loading...</div>

  if (!friends.length) return <div className='notification' >you have no friends</div>

  return (
    <>
      {friends.map(friend => {
        return (
          <FriendItem
            key={friend._id}
            friend={friend}
            isDarkTheme={isDarkTheme}
            userLogout={userLogout}
            changePopUpDisplay={changePopUpDisplay}
          />
        )
      })}
    </>
  )
}

const mapStateToProps = store => {
  return {
    userName: store.account.userName,
    isDarkTheme: store.appearance.isDarkTheme
  }
}

const mapActionsToProps = dispatch => {
  return {
    userLogout: bindActionCreators(userLogout, dispatch),
    changePopUpDisplay: bindActionCreators(changePopUpDisplay, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(FriendsList)
