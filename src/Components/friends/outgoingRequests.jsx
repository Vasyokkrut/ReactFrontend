import axios from 'axios'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { hardLogout } from '../../utilities.js'

function RequestItem({isDarkTheme, user}) {
  const [isDeleted, setIsDeleted] = useState(false)

  const requestItemClassName = classnames(
    'request-item',
    isDarkTheme ? 'request-item-dark' : 'request-item-light'
  )

  const clickableItemClassName = classnames(
    'clickable-item',
    isDarkTheme ? 'clickable-item-dark' : 'clickable-item-light'
  )

  function removeRequest() {
    const config = {
      data: user
    }
    axios.delete('/api/friends/deleteOutgoingRequest', config)
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
    <div className={requestItemClassName} >
      <Link to={`/userPosts/${user.name}`} className='friend-item-name' >{user.name}</Link>
      <div>
        <Link to={`/userPosts/${user.name}`} className={clickableItemClassName} >view profile</Link>
        <button className={clickableItemClassName} onClick={removeRequest} >delete request</button>
      </div>
    </div>
  )
}

function OutgoingRequests({isDarkTheme}) {
  const [requests, setRequests] = useState([])
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    axios.get('/api/friends/getOutgoingRequests')
      .then(res => {
        setRequests(res.data)
        setIsDataLoaded(true)
      })
      .catch(err => {
        const status = err.response.status
        if (status === 401 || status === 403) {
          hardLogout()
        }
      })
  }, [])

  const hrStyle = {
    marginTop: '0',
    backgroundColor: isDarkTheme ? '#333' : '#ccc'
  }

  if (!isDataLoaded) return (
    <div>
      <hr className='hr-line' style={hrStyle} />
      <div className='notification' >loading...</div>
    </div>
  )

  if (!requests.length) return (
    <div>
      <hr className='hr-line' style={hrStyle} />
      <div className='notification' >you have no outgoing friend requests</div>
    </div>
  )

  return (
    <>
      {requests.map(request => {
        return (
          <RequestItem
            isDarkTheme={isDarkTheme}
            key={request._id}
            user={request}
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

export default connect(mapStateToProps)(OutgoingRequests)
