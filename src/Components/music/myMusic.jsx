import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import React, { useEffect, useState } from 'react'

import './styles.scss'
import AddTrack from './addTrack.jsx'
import AudioTrack from './audioTrack.jsx'
import AudioPlayerControls from './audioPlayerControls.jsx'
import { setUserAudioTracks } from '../../Store/music/actions.js'

function MyMusic({userName, userAudioTracks, setUserAudioTracks, isDarkTheme}) {

  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    if (userName) {
      axios.get('/api/music/getUserMusic/' + userName)
        .then(res => {
          setUserAudioTracks(res.data.userMusic)
          setIsDataLoaded(true)
        })
    }
    return () => {
      setIsDataLoaded(false)
    }
  }, [userName, setUserAudioTracks])

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
