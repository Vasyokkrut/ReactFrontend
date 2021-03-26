import axios from 'axios'
import { connect } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'

import './styles.scss'
import AddTrack from './addTrack.jsx'
import AudioTrack from './audioTrack.jsx'
import AudioPlayerControls from './audioPlayerControls.jsx'
import { setUserAudioTracks } from '../../Store/actions.js'

function MyMusic({userName, userJWT, userAudioTracks, setUserAudioTracks, isDarkTheme}) {

  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    if (!userName || !userJWT) return
    
    const config = {headers: {'Authorization': 'Bearer ' + userJWT}}
    axios.get('/api/music/getUserMusic/' + userName, config)
      .then(res => {
        setUserAudioTracks(res.data.userMusic)
        setIsDataLoaded(true)
      })
  }, [userName, userJWT, setUserAudioTracks])

  if (!userName) {
    return(
      <div style={{fontSize: '4rem', textAlign: 'center'}} >
        You aren't logged in
      </div>
    )
  }

  if (!isDataLoaded) {
    return(
      <div style={{fontSize: '5rem', textAlign: 'center'}} >
        loading...
      </div>
    )
  }

  const hrStyle = {
    height: '2px',
    marginTop: '2rem',
    borderStyle: 'none',
    backgroundColor: isDarkTheme ? '#666' : '#ccc'
  }

  return(
    <>
      <AddTrack />
      <AudioPlayerControls />
      <hr style={hrStyle} />
      {userAudioTracks.map((audioTrack, index) => {
        return(
          <AudioTrack
            index={index}
            key={audioTrack._id}
            audioTrack={audioTrack}
          />
        )
      })}
    </>
  )
}

const mapStateToProps = store => {
  return {
    userJWT: store.userJWT,
    userName: store.userName,
    isDarkTheme: store.isDarkTheme,
    userAudioTracks: store.userAudioTracks
  }
}

const mapActionsToProps = dispatch => {
  return {
    setUserAudioTracks: bindActionCreators(setUserAudioTracks, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(MyMusic)
