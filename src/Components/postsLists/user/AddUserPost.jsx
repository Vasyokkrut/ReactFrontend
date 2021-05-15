import axios from 'axios'
import { useState } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addUserPost } from '../../../Store/posts/actions.js'
import { userLogout } from '../../../Store/account/actions.js'
import { changePopUpDisplay } from '../../../Store/appearance/actions.js'

function AddPostForm(props) {
  const [picture, setPicture] = useState(null)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [preview, setPreview] = useState(null)
  const [status, setStatus] = useState({successful: true, message: ''})

  const titleInputClassName = classNames(
    'title-input',
    props.isDarkTheme ? 'title-input-dark' : 'title-input-light'
  )

  const textInputClassName = classNames(
    'textinput',
    props.isDarkTheme ? 'textinput-dark' : 'textinput-light'
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
    axios.put('/api/uploadPostForUser', data)
      .then(response => {
        props.addUserPost(response.data)
        setPicture(null)
        setPreview(null)
        setTitle('')
        setText('')
        setStatus({
          successful: true,
          message: ''
        })
        document.getElementById('choose-picture-input').value = ''
      })
      .catch(err => {
        const status = err.response.status
        if (status === 401 || status === 403) {
          axios.get('/api/account/getNewAccessToken')
            .then(res => axios.put('/api/uploadPostForUser', data))
            .then(res => {
              props.addUserPost(res.data)
              setPicture(null)
              setPreview(null)
              setTitle('')
              setText('')
              setStatus({
                successful: true,
                message: ''
              })
              document.getElementById('choose-picture-input').value = ''
            })
            .catch(err => {
              const status = err.response.status
              if (status === 401 || status === 403) {
                localStorage.removeItem('userName')
                props.userLogout()
                props.changePopUpDisplay()
                setStatus({
                  successful: false,
                  message: ''
                })
              } else {
                setStatus({
                  successful: false,
                  message: 'something went wrong :('
                })
              }
            })
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

  if (!props.userName || props.userName.toLowerCase() !== props.URLUserName.toLowerCase()) return null

  return(
    <div className='post-creator'>
      <label className='upload-button'>
        {picture === null ? 'Create Post' : 'Rechoose picture'}
        <input
          id='choose-picture-input'
          accept='image/*'
          type='file'
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
            className='upload-button'
            onClick={handleUpload}
          >
            Upload Picture
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
    userLogout: bindActionCreators(userLogout, dispatch),
    addUserPost: bindActionCreators(addUserPost, dispatch),
    changePopUpDisplay: bindActionCreators(changePopUpDisplay, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(AddPostForm)
