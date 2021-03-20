import axios from 'axios'
import { connect } from 'react-redux'
import React, { useState } from 'react'
import { bindActionCreators } from 'redux'

import { addAudioTrack } from '../../Store/actions.js'

function AddTrack(props) {
  const [title, setTitle] = useState('')
  const [track, setTrack] = useState(null)

  function handleTrackInput(event) {
    setTrack(event.target.files[0])
  }

  function handleTitleInput(event) {
    setTitle(event.target.value)
  }

  function uploadTrack() {
    if (track !== null) {
      const config = {headers: {'Authorization': 'Bearer ' + props.userJWT}}
      const data = new FormData()
      data.append('title', title)
      data.append('track', track)
      axios.put('/api/uploadMusicForUser', data, config)
        .then(res => {
          setTrack(null)
          setTitle('')
          props.addAudioTrack(res.data)
        })
    }
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
            <div style={{fontSize:'1.2rem', textAlign:'center'}}>
              Track is choosen!<br />
              You can upload it<br />
              using form below
            </div>
            <input
              className='title-input'
              type='text'
              placeholder='Choose title'
              onChange={handleTitleInput}
              value={title}
              onKeyDown={event => {if (event.key === 'Enter') uploadTrack()}}
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
    userJWT: store.userJWT
  }
}

const mapActionsToProps = dispatch => {
  return {
    addAudioTrack: bindActionCreators(addAudioTrack, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(AddTrack)
