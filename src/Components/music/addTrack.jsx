import axios from 'axios'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { useState, useRef } from 'react'
import { bindActionCreators } from 'redux'

import { userLogout } from '../../Store/account/actions.js'
import { addAudioTrack } from '../../Store/music/actions.js'
import { changePopUpDisplay } from '../../Store/appearance/actions.js'

function AddTrack(props) {
  const inputRef = useRef()
  const [title, setTitle] = useState('')
  const [track, setTrack] = useState(null)
  const [uploadStatus, setUploadStatus] = useState({message: '', successful: true})

  const titleInputClassName = classNames(
    'audiotrack-title-input',
    props.isDarkTheme ? 'audiotrack-title-input-dark' : 'audiotrack-title-input-light'
  )

  const buttonClassName = classNames(
    'primary-button',
    props.isDarkTheme ? 'primary-button-dark' : 'primary-button-light'
  )

  const statusStyle = {
    height: '2rem',
    fontSize: '1.5rem',
    color: uploadStatus.successful ? 'green' : 'red'
  }

  function handleTrackInput(event) {
    setTrack(event.target.files[0])
  }

  function handleTitleInput(event) {
    setTitle(event.target.value)
  }

  function uploadTrack() {
    if (title === '') {
      setUploadStatus({
        successful: false,
        message: 'title is empty'
      })
      return
    }
    setUploadStatus({
      successful: true,
      message: 'your audiotrack is uploading...'
    })
    if (track !== null) {
      const data = new FormData()
      data.append('title', title)
      data.append('track', track)
      axios.put('/api/music/uploadAudioTrack', data)
        .then(res => {
          setTrack(null)
          setTitle('')
          setUploadStatus({message: '', successful: true})
          inputRef.current.value = ''
          props.addAudioTrack(res.data)
        })
        .catch(err => {
          const status = err.response.status
          if (status === 401 || status === 403) {
            localStorage.removeItem('userName')
            props.userLogout()
            props.changePopUpDisplay()
          } else {
            setUploadStatus({
              successful: false,
              message: 'something went wrong :('
            })
          }
        })
    }
  }

  function sendOnEnter(event) {
    if (event.key === 'Enter') uploadTrack()
  }

  return(
    <div className='flex-center-column' >
      <div className='flex-center'>
        <label className={buttonClassName}>
          {!track ? 'Add track' : 'Rechoose track'}
          <input
            id='choose-track-input'
            ref={inputRef}
            type='file'
            accept='audio/*'
            onInput={handleTrackInput}
          />
        </label>
      </div>
      {
        track ?
        <div className='flex-center-column' style={{width: '100%'}} >
          <div style={{fontSize:'1.2rem', textAlign: 'center'}}>
            Track is choosen!<br />
            You can upload it using form below:
          </div>
          <input
            className={titleInputClassName}
            type='text'
            placeholder='Choose title'
            onChange={handleTitleInput}
            value={title}
            onKeyDown={sendOnEnter}
          />
          <div style={statusStyle} >{uploadStatus.message}</div>
          <button
            className={buttonClassName}
            onClick={uploadTrack}
          >Upload track</button>
        </div>
        : null
      }
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
