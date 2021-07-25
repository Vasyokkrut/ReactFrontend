import axios from 'axios'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { useEffect, useState } from 'react'

import { userLogout } from '../../Store/account/actions.js'
import { changePopUpDisplay } from '../../Store/appearance/actions.js'

function RequestItem({requester, isDarkTheme, userLogout, changePopUpDisplay}) {
  const [isAccepted, setIsAccepted] = useState(false)
  const [isDeclined, setIsDeclined] = useState(false)

  const clickableItemClassName = classnames(
    'clickable-item',
    isDarkTheme ? 'clickable-item-dark' : 'clickable-item-light'
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
          localStorage.removeItem('userName')
          userLogout()
          changePopUpDisplay()
        }
      })
  }

  function declineRequest() {
    axios.post('/api/friends/declineIncomingRequest', {requester})
      .then(res => setIsDeclined(true))
      .catch(err => {
        const status = err.response.status
        if (status === 401 || status === 403) {
          localStorage.removeItem('userName')
          userLogout()
          changePopUpDisplay()
        }
      })
  }

  if (isAccepted) {
    return (
      <div className={requestItemClassName} >
        <span className='notification' >request from {requester.name} accepted</span>
      </div>
    )
  }

  if (isDeclined) {
    return (
      <div className={requestItemClassName} >
        <span className='notification' >request from {requester.name} declined</span>
      </div>
    )
  }

  return (
    <div className={requestItemClassName} >
      <Link className='friend-item-name' to={`/userPosts/${requester.name}`} >{requester.name}</Link>
      <div>
        <button className={clickableItemClassName} onClick={acceptRequest} >accept</button>
        <button className={clickableItemClassName} onClick={declineRequest} >decline</button>
      </div>
    </div>
  )
}

function IncomingRequests({isDarkTheme, userLogout, changePopUpDisplay}) {
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
          localStorage.removeItem('userName')
          userLogout()
          changePopUpDisplay()
        }
      })
  }, [userLogout, changePopUpDisplay])

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
    isDarkTheme: store.appearance.isDarkTheme
  }
}

const mapActionsToProps = dispatch => {
  return {
    userLogout: bindActionCreators(userLogout, dispatch),
    changePopUpDisplay: bindActionCreators(changePopUpDisplay, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(IncomingRequests)
