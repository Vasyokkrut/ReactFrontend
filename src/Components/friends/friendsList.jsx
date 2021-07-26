import axios from 'axios'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { hardLogout } from '../../utilities.js'

function FriendItem({isDarkTheme, friend}) {
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
          hardLogout()
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

function FriendsList({isDarkTheme, userName, setSelectedOption}) {
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
          hardLogout()
        }
      })
  }, [userName])

  const hrStyle = {
    backgroundColor: isDarkTheme ? '#333' : '#ccc',
    marginTop: '0'
  }

  if (!isDataLoaded) return (
    <div>
      <hr className='hr-line' style={hrStyle} />
      <div className='notification' >loading...</div>
    </div>
  )

  const searchButtonClassName = classnames(
    'search-button',
    isDarkTheme ? 'search-button-dark' : 'search-button-light'
  )

  const buttonStyle = {
    height: '2rem',
    margin: '1rem 1rem .8rem 1rem'
  }

  if (!friends.length) return (
    <div>
      <hr className='hr-line' style={hrStyle} />
      <div className='notification' >you have no friends :(</div>
      <div className='flex-center' >
        <div className='notification' style={{display: 'flex', alignItems: 'center'}} >
          but you can
          <button
            onClick={() => setSelectedOption('search friends')}
            style={buttonStyle}
            className={searchButtonClassName}
          >search</button>
          them!
        </div>
      </div>
    </div>
  )

  return (
    <>
      {friends.map(friend => {
        return (
          <FriendItem
            key={friend._id}
            friend={friend}
            isDarkTheme={isDarkTheme}
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

export default connect(mapStateToProps)(FriendsList)
