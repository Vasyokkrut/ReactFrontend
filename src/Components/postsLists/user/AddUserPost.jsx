import axios from 'axios'
import { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addUserPost } from '../../../Store/posts/actions.js'
import { userLogout } from '../../../Store/account/actions.js'
import { changePopUpDisplay } from '../../../Store/appearance/actions.js'

function AddPostForm(props) {
    const [picture, setPicture] = useState(null)
    const [title, setTitle] = useState('')
    const [preview, setPreview] = useState(null)

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

    function handleUpload() {
        if(picture !== null) {
            const data = new FormData()
            data.append('title', title)
            data.append('picture', picture)
            
            axios.put('/api/uploadPostForUser', data)
                .then(response => {
                    props.addUserPost(response.data)
                    setPicture(null)
                    setPreview(null)
                    setTitle('')
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
                                document.getElementById('choose-picture-input').value = ''
                            })
                            .catch(err => {
                                const status = err.response.status
                                if (status === 401 || status === 403) {
                                    localStorage.removeItem('userName')
                                    this.props.userLogout()
                                    this.props.changePopUpDisplay()
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
                        <img src={preview} alt='preview' className='preview-photo' />
                        : null
                    }
                    </div>
                    <input
                        className='title-input'
                        type='text'
                        placeholder='Choose title'
                        onChange={handleTitleInput}
                        value={title}
                        onKeyDown={event => {if (event.key === 'Enter') handleUpload()}}
                    />
                    <div className='flex-center'>
                        <button
                            className='upload-button'
                            onClick={handleUpload}
                        >
                            Upload Picture
                        </button>
                    </div>
                </>
                : null
            }
        </div>
    )
}

const mapStateToProps = store => {
    return {
        userName: store.account.userName
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
