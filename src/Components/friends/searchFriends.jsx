import axios from 'axios'
import { useState } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { hardLogout } from '../../utilities.js'

function FoundUser({isDarkTheme, user}) {
  const [isRequestSent, setIsRequestSent] = useState(false)
  const [isRequestAccepted, setIsRequestAccepted] = useState(false)

  const clickableItemClassName = classnames(
    'clickable-item',
    isDarkTheme ? 'clickable-item-dark' : 'clickable-item-light'
  )

  const searchItemClassName = classnames(
    'search-item',
    isDarkTheme ? 'search-item-dark' : 'search-item-light'
  )

  function sendFriendRequest() {
    axios.post('/api/friends/sendRequest', {recipient: user})
      .then(res => setIsRequestSent(true))
      .catch(err => {
        const status = err.response.status
        if (status === 401 || status === 403) {
          hardLogout()
        }
      })
  }

  function acceptFriendRequest() {
    axios.post('/api/friends/acceptRequest', {requester: user})
      .then(res => setIsRequestAccepted(true))
      .catch(err => {
        const status = err.response.status
        if (status === 401 || status === 403) {
          hardLogout()
        }
      })
  }

  if (user.isFriend) {
    return (
      <div className={searchItemClassName} >
        <Link className='friend-item-name' to={`/userPosts/${user.name}`} >{user.name}</Link>
        <div>
          <button className={clickableItemClassName} disabled={true} >
            you are friends
          </button>
        </div>
      </div>
    )
  }

  if (user.isInIncomingRequests) {
    return (
      <div className={searchItemClassName} >
        <Link to={`/userPosts/${user.name}`} className='friend-item-name' >{user.name}</Link>
        <div>
          <button
            onClick={acceptFriendRequest}
            disabled={isRequestAccepted}
            className={clickableItemClassName}
          >
            {isRequestAccepted ? 'accepted': 'accept request'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={searchItemClassName} >
      <Link to={`/userPosts/${user.name}`} className='friend-item-name' >{user.name}</Link>
      <div>
        <button
          onClick={sendFriendRequest}
          disabled={isRequestSent || user.isInOutgoingRequests}
          className={clickableItemClassName}
        >
          {isRequestSent || user.isInOutgoingRequests ? 'request sent': 'send request'}
        </button>
      </div>
    </div>
  )
}

function SearchFriends({isDarkTheme}) {
  const [requestedUser, setRequestedUser] = useState('')
  const [foundUsers, setFoundUsers] = useState([])
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  const searchInputClassName = classnames(
    'search-input',
    isDarkTheme ? 'search-input-dark' : 'search-input-light'
  )

  const searchButtonClassName = classnames(
    'search-button',
    isDarkTheme ? 'search-button-dark' : 'search-button-light'
  )

  function checkRequestedUsername() {
    const allowedSymbols = /^[A-Za-z0-9]+$/

    if (!allowedSymbols.test(requestedUser)) return false
    return true
  }

  function sendSearchRequest() {
    if (!checkRequestedUsername()) return

    setIsDataLoaded(false)
    axios.get('/api/friends/searchFriends?username=' + requestedUser)
      .then(res => {
        setFoundUsers(res.data)
        setIsDataLoaded(true)
      })
      .catch(err => {
        const status = err.response.status
        if (status === 401 || status === 403) {
          hardLogout()
        } else {
          setFoundUsers([])
          setIsDataLoaded(true)
        }
      })
  }

  const hrStyle = {
    marginTop: '0',
    backgroundColor: isDarkTheme ? '#333' : '#ccc'
  }

  return (
    <>
      <hr className='hr-line search-hr-line' style={hrStyle} />
      <div className='search-friends' >
        <input
          type='text'
          placeholder='search friends'
          className={searchInputClassName}
          onChange={event => setRequestedUser(event.target.value)}
        />
        <button
          className={searchButtonClassName}
          onClick={sendSearchRequest}
          disabled={!requestedUser}
        >search</button>
      </div>
      {isDataLoaded && !foundUsers.length
        ? <div className='notification' >
          sorry, users with this name were not found
        </div>
        : null
      }
      {foundUsers.map(user => {
        return (
          <FoundUser
            key={user._id}
            user={user}
            isDarkTheme={isDarkTheme}
          />
        )
      })}
    </>
  )
}

const mapStateToProps = store => {
  return {
    isDarkTheme: store.appearance.isDarkTheme
  }
}

export default connect(mapStateToProps)(SearchFriends)
