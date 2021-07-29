import axios from 'axios'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { hardLogout } from '../../utilities.js'

function RequestItem({requester, isDarkTheme}) {
  const [isAccepted, setIsAccepted] = useState(false)
  const [isDeclined, setIsDeclined] = useState(false)

  const acceptRequestClassName = classnames(
    'clickable-item',
    isDarkTheme ? 'clickable-item-dark' : 'clickable-item-light'
  )

  const declineRequestClassName = classnames(
    'clickable-item',
    isDarkTheme ? 'clickable-item-dark-danger' : 'clickable-item-light-danger'
  )

  const requestItemClassName = classnames(
    'request-item',
    isDarkTheme ? 'request-item-dark' : 'request-item-light'
  )

  function acceptRequest() {
    axios.post('/api/friends/acceptRequest', {requester})
      .then(res => setIsAccepted(true))
      .catch(err => {
        const status = err.response.status
        if (status === 401 || status === 403) {
          hardLogout()
        }
      })
  }

  function declineRequest() {
    axios.post('/api/friends/declineIncomingRequest', {requester})
      .then(res => setIsDeclined(true))
      .catch(err => {
        const status = err.response.status
        if (status === 401 || status === 403) {
          hardLogout()
        }
      })
  }

  return (
    <div className={requestItemClassName} >
      <Link className='friend-item-name' to={`/userPosts/${requester.name}`} >{requester.name}</Link>
      <div>
        <button className={acceptRequestClassName} onClick={acceptRequest} disabled={isDeclined || isAccepted} >
          {isAccepted ? 'accepted' : 'accept'}
        </button>
        <button className={declineRequestClassName} onClick={declineRequest} disabled={isDeclined || isAccepted} >
          {isDeclined ? 'declined' : 'decline'}
        </button>
      </div>
    </div>
  )
}

function IncomingRequests({isDarkTheme}) {
  const [requesters, setRequesters] = useState([])
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    axios.get('/api/friends/getIncomingRequests')
      .then(res => {
        setRequesters(res.data)
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

  if (!requesters.length) return (
    <div>
      <hr className='hr-line' style={hrStyle} />
      <div className='notification' >you have no incoming friend requests</div>
    </div>
  )

  return (
    <>
      {requesters.map(requester => {
        return (
          <RequestItem
            isDarkTheme={isDarkTheme}
            key={requester._id}
            requester={requester}
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

export default connect(mapStateToProps)(IncomingRequests)
