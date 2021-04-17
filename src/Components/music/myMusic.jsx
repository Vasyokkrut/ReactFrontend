import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import React, { useEffect, useState } from 'react'

import './styles.scss'
import AddTrack from './addTrack.jsx'
import AudioTrack from './audioTrack.jsx'
import AudioPlayerControls from './audioPlayerControls.jsx'
import { setUserAudioTracks } from '../../Store/music/actions.js'

function MyMusic({userName, userJWT, userAudioTracks, setUserAudioTracks, isDarkTheme}) {

  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    if (userName && userJWT) {
      const config = {headers: {'Authorization': 'Bearer ' + userJWT}}
      axios.get('/api/music/getUserMusic/' + userName, config)
        .then(res => {
          setUserAudioTracks(res.data.userMusic)
          setIsDataLoaded(true)
        })
    }
    return () => {
      setIsDataLoaded(false)
    }
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
      <div style={{fontSize: '4rem', textAlign: 'center'}} >
        loading...
      </div>
    )
  }

  if (!userAudioTracks.length) {
    return(
      <>
        <div style={{fontSize: '3rem', textAlign: 'center'}} >
          you have no tracks :( <br />
          fortunatly, you can add one!
        </div>
        <AddTrack />
      </>
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
    userJWT: store.account.userJWT,
    userName: store.account.userName,
    isDarkTheme: store.appearance.isDarkTheme,
    userAudioTracks: store.music.userAudioTracks
  }
}

const mapActionsToProps = dispatch => {
  return {
    setUserAudioTracks: bindActionCreators(setUserAudioTracks, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(MyMusic)
