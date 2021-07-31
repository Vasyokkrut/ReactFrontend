import axios from 'axios'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './styles.scss'
import AddTrack from './addTrack.jsx'
import AudioTrack from './audioTrack.jsx'
import LoginPage from '../loginPage/loginPage.jsx'
import { setUserAudioTracks } from '../../Store/music/actions.js'

function MyMusic({userName, userAudioTracks, setUserAudioTracks}) {
  useEffect(() => {
    if (userName) {
      axios.get('/api/music/getMusic/' + userName)
        .then(res => setUserAudioTracks(res.data.userMusic))
    }
  }, [userName, setUserAudioTracks])

  if (!userName) return <LoginPage />

  if (!userAudioTracks) {
    return(
      <div style={{fontSize: '2rem', textAlign: 'center'}} >
        loading...
      </div>
    )
  }

  if (!userAudioTracks.length) {
    return(
      <>
        <AddTrack />
        <div className='notification' >
          you have no tracks :( <br />
          use button above to add one!
        </div>
      </>
    )
  }

  return(
    <>
      <AddTrack />
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
