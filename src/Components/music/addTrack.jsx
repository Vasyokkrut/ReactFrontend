import axios from 'axios'
import classNames from 'classnames'
import { connect } from 'react-redux'
import React, { useState } from 'react'
import { bindActionCreators } from 'redux'

import { userLogout } from '../../Store/account/actions.js'
import { addAudioTrack } from '../../Store/music/actions.js'
import { changePopUpDisplay } from '../../Store/appearance/actions.js'

function AddTrack(props) {
  const [title, setTitle] = useState('')
  const [track, setTrack] = useState(null)

  const titleInputClassName = classNames(
    'audiotrack-title-input',
    props.isDarkTheme ? 'audiotrack-title-input-dark' : 'audiotrack-title-input-light'
  )

  function handleTrackInput(event) {
    setTrack(event.target.files[0])
  }

  function handleTitleInput(event) {
    setTitle(event.target.value)
  }

  function uploadTrack() {
    if (track !== null) {
      const data = new FormData()
      data.append('title', title)
      data.append('track', track)
      axios.put('/api/music/uploadMusicForUser', data)
        .then(res => {
          setTrack(null)
          setTitle('')
          props.addAudioTrack(res.data)
        })
        .catch(err => {
          const status = err.response.status
          if (status === 401 || status === 403) {
            axios.get('/api/account/getNewAccessToken')
            .then(res => axios.put('/api/music/uploadMusicForUser', data))
            .then(res => {
                setTrack(null)
                setTitle('')
                props.addAudioTrack(res.data)
              })
            .catch(err => {
              const status = err.response.status
              if (status === 401 || status === 403) {
                localStorage.removeItem('userName')
                props.userLogout()
                props.changePopUpDisplay()
              } else {
                alert('error happened :(')
              }
            })
          } else {
            alert('error happened :(')
          }
        })
    }
  }

  function sendOnEnter(event) {
    if (event.key === 'Enter') uploadTrack()
  }

  return(
    <div className='flex-center' >
      <div>
        <div className='flex-center'>
          <label className='upload-button'>
            {!track ? 'Add track' : 'Rechoose track'}
            <input
              id='choose-track-input'
              type='file'
              accept='audio/*'
              onInput={handleTrackInput}
            />
          </label>
        </div>
        {
          !track
          ?
          null
          :
          <>
            <div style={{fontSize:'1.2rem', textAlign:'center', margin: '1rem'}}>
              Track is choosen!<br />
              You can upload it<br />
              using form below
            </div>
            <input
              className={titleInputClassName}
              type='text'
              placeholder='Choose title'
              onChange={handleTitleInput}
              value={title}
              onKeyDown={sendOnEnter}
            />
            <div className='flex-center'>
              <button className='upload-button' onClick={uploadTrack} >Upload track</button>
            </div>
          </>
        }
      </div>
    </div>
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
    addAudioTrack: bindActionCreators(addAudioTrack, dispatch),
    changePopUpDisplay: bindActionCreators(changePopUpDisplay, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(AddTrack)
