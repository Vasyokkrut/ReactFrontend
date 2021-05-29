import { useState } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'

import './styles.scss'
import IncomingRequests from './incomingRequests.jsx'
import OutgoingRequests from './outgoingRequests.jsx'
import FriendsList from './friendsList.jsx'
import SearchFriends from './searchFriends.jsx'

function SelectedOption({selectedOption}) {
  switch (selectedOption) {
    case 'friendsList':
      return <FriendsList />
    case 'searchFriends':
      return <SearchFriends />
    case 'incomingRequests':
      return <IncomingRequests />
    case 'outgoingRequests':
      return <OutgoingRequests />
    default:
      return <FriendsList />
  }
}

function Friends({isDarkTheme, userName}) {
  const [selectedOption, setSelectedOption] = useState('friendsList')

  if (!userName) return <div className='notification' >you aren't logged in</div>

  const optionsItemClassName = classnames(
    'options-item',
    isDarkTheme ? 'options-item-dark' : 'options-item-light'
  )

  return (
    <>
      <div className='options' >
        <button
          onClick={() => setSelectedOption('friendsList') }
          className={optionsItemClassName}
        >friends
        </button>
        <button
          onClick={() => setSelectedOption('searchFriends') }
          className={optionsItemClassName}
        >search friends
        </button>
        <button
          onClick={() => setSelectedOption('incomingRequests') }
          className={optionsItemClassName}
        >incoming requests
        </button>
        <button
          onClick={() => setSelectedOption('outgoingRequests') }
          className={optionsItemClassName}
        >outgoing requests
        </button>
      </div>
      <SelectedOption selectedOption={selectedOption} />
    </>
  )
}

const mapStateToProps = store => {
  return {
    userName: store.account.userName,
    isDarkTheme: store.appearance.isDarkTheme
  }
}

export default connect(mapStateToProps)(Friends)
