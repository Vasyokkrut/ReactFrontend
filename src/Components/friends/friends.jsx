import { useState } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'

import './styles.scss'
import FriendsList from './friendsList.jsx'
import SearchFriends from './searchFriends.jsx'
import LoginPage from '../loginPage/loginPage.jsx'
import IncomingRequests from './incomingRequests.jsx'
import OutgoingRequests from './outgoingRequests.jsx'

function SelectedOption({selectedOption, setSelectedOption}) {
  switch (selectedOption) {
    case 'friends':
      return <FriendsList setSelectedOption={setSelectedOption} />
    case 'search friends':
      return <SearchFriends />
    case 'incoming requests':
      return <IncomingRequests />
    case 'outgoing requests':
      return <OutgoingRequests />
    default:
      return <FriendsList setSelectedOption={setSelectedOption} />
  }
}

function Friends({isDarkTheme, userName}) {
  const [selectedOption, setSelectedOption] = useState('friends')
  const [isInSelectorMode, setIsInSelectorMode] = useState(false)
  if (!userName) return <LoginPage />

  const optionsClassName = classnames(
    'options',
    isDarkTheme ? 'options-dark' : 'options-light'
  )

  const optionsItemClassName = classnames(
    'options-item',
    isDarkTheme ? 'options-item-dark' : 'options-item-light'
  )

  const overlayStyle = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    display: isInSelectorMode ? 'block' : 'none'
  }

  const optionsStyle = {}
  if (isInSelectorMode) optionsStyle.display = 'flex'

  return (
    <>
      <span style={overlayStyle} onClick={() => setIsInSelectorMode(false)} />
      <div className='options-selector' >
        <button className='options-selector-button' onClick={() => setIsInSelectorMode(true)} >
          {selectedOption} <div>&rsaquo;</div>
        </button>
      </div>
      <div className={optionsClassName} style={optionsStyle} >
        <button
          onClick={() => {setSelectedOption('friends'); setIsInSelectorMode(false)} }
          className={optionsItemClassName}
        >friends</button>
        <button
          onClick={() => {setSelectedOption('search friends'); setIsInSelectorMode(false)} }
          className={optionsItemClassName}
        >search friends</button>
        <button
          onClick={() => {setSelectedOption('incoming requests'); setIsInSelectorMode(false)} }
          className={optionsItemClassName}
        >incoming requests</button>
        <button
          onClick={() => {setSelectedOption('outgoing requests'); setIsInSelectorMode(false)} }
          className={optionsItemClassName}
        >outgoing requests</button>
      </div>
      <SelectedOption selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
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
