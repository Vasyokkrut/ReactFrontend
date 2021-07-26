import axios from 'axios'
import { useState, useRef } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { hardLogout } from '../../utilities.js'
import { addUserPost } from '../../Store/posts/actions.js'

function AddPostForm(props) {
  const [picture, setPicture] = useState(null)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [preview, setPreview] = useState(null)
  const [status, setStatus] = useState({successful: true, message: ''})
  const inputRef = useRef()

  const titleInputClassName = classNames(
    'title-input',
    props.isDarkTheme ? 'title-input-dark' : 'title-input-light'
  )

  const textInputClassName = classNames(
    'textinput',
    props.isDarkTheme ? 'textinput-dark' : 'textinput-light'
  )

  const buttonClassName = classNames(
    'primary-button',
    props.isDarkTheme ? 'primary-button-dark' : 'primary-button-light'
  )

  function handlePictureInput(event) {
    const picture = event.target.files[0]

    setPicture(picture)

    const reader = new FileReader()
    reader.onload = event => {
      setPreview(event.target.result)
    }
    reader.readAsDataURL(picture)
  }

  function handleTitleInput(event) {
    setTitle(event.target.value)
  }

  function handleTextInput(event) {
    setText(event.target.value)
  }

  function checkInput() {
    if (!title) {
      setStatus({
        successful: false,
        message: 'title of your post cannot be empty'
      })
      return false
    }
    if (title.length > 22) {
      setStatus({
        successful: false,
        message: 'your title is too large, please, keep it simple'
      })
      return false
    }
    if (!text) {
      setStatus({
        successful: false,
        message: 'text of your post cannot be empty'
      })
      return false
    }
    return true
  }

  function handleUpload() {
    if (!checkInput()) return

    const data = new FormData()
    data.append('text', text)
    data.append('title', title)
    data.append('picture', picture)
        
    setStatus({
      successful: true,
      message: 'your post is uploading...'
    })
    axios.put('/api/posts/uploadPost', data)
      .then(response => {
        setPicture(null)
        setPreview(null)
        setTitle('')
        setText('')
        setStatus({
          successful: true,
          message: ''
        })
        inputRef.current.value = ''
        props.addUserPost(response.data)
      })
      .catch(err => {
        const status = err.response.status
        if (status === 401 || status === 403) {
          hardLogout()
        } else {
          setStatus({
            successful: false,
            message: 'something went wrong :('
          })
        }
      })
  }

  const messageStyle = {
    color: status.successful ? 'green' : 'red'
  }

  if (props.userName !== props.requestedUserName) return null

  return(
    <div className='post-creator'>
      <label className={buttonClassName}>
        {picture === null ? 'Choose picture' : 'Rechoose picture'}
        <input
          id='choose-picture-input'
          accept='image/*'
          type='file'
          ref={inputRef}
          onInput={handlePictureInput}
        />
      </label>
      {
        picture ?
        <>
          <div className='preview-container' >
          {
            preview ?
            <img draggable={false} src={preview} alt='preview' className='preview-photo' />
            : null
          }
          </div>
          <div className='title-input-wrapper' >
            <input
              className={titleInputClassName}
              type='text'
              placeholder='Choose title'
              onChange={handleTitleInput}
              value={title}
              onKeyDown={event => {if (event.key === 'Enter') handleUpload()}}
            />
          </div>
          <textarea
            value={text}
            onChange={handleTextInput}
            placeholder='Enter your message here...'
            className={textInputClassName}
          />
          <div style={messageStyle} className='upload-status' >
            {status.message}
          </div>
          <button
            className={buttonClassName}
            onClick={handleUpload}
          >
            Upload Post
          </button>
        </>
        : null
      }
    </div>
  )
}

const mapStateToProps = store => {
  return {
    userName: store.account.userName,
    isDarkTheme: store.appearance.isDarkTheme
  }
}

const mapActionsToProps = dispatch => {
  return {
    addUserPost: bindActionCreators(addUserPost, dispatch),
  }
}

export default connect(mapStateToProps, mapActionsToProps)(AddPostForm)
