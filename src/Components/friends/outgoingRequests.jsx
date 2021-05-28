import axios from 'axios'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { useEffect, useState } from 'react'

import { userLogout } from '../../Store/account/actions.js'
import { changePopUpDisplay } from '../../Store/appearance/actions.js'

function RequestItem({isDarkTheme, user, userLogout, changePopUpDisplay}) {
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
          localStorage.removeItem('userName')
          userLogout()
          changePopUpDisplay()
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

function OutgoingRequests({isDarkTheme, userLogout, changePopUpDisplay}) {
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
          localStorage.removeItem('userName')
          userLogout()
          changePopUpDisplay()
        }
      })
  }, [userLogout, changePopUpDisplay])

  if (!isDataLoaded) return <div className='notification' >loading...</div>

  if (!requests.length) return <div className='notification' >you have no outgoing friend requests</div>

  return (
    <>
      {requests.map(request => {
        return (
          <RequestItem
            isDarkTheme={isDarkTheme}
            key={request._id}
            user={request}
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

export default connect(mapStateToProps, mapActionsToProps)(OutgoingRequests)
