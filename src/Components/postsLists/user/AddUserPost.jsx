import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addUserPost } from '../../../Store/actions.js'

function AddPostForm(props) {
    const [picture, setPicture] = useState(null)
    const [title, setTitle] = useState('')

    function handlePictureInput(event) {
        setPicture(event.target.files[0])
    }

    function handleTitleInput(event) {
        setTitle(event.target.value)
    }

    function handleUpload() {
        if(picture !== null) {
            const config = {headers: {'Authorization': 'Bearer ' + props.userJWT}}
            const data = new FormData()
            data.append('title', title)
            data.append('picture', picture)
            
            axios.put('/api/uploadPostForUser', data, config)
            .then(response => {
                props.addUserPost(response.data)
                setPicture(null)
                setTitle('')
                document.getElementById('choose-picture-input').value = ''
            })
        }
    }

    if (!props.isLoggedIn || props.userName.toLowerCase() !== props.URLUserName.toLowerCase()) return null

    return(
        <div className='flex-center'>
            <div>
                <div className='flex-center'>
                    <label className='upload-button'>
                        {picture === null? 'Create Post' : 'Rechoose picture'}
                        <input
                            id='choose-picture-input'
                            accept='image/*'
                            type='file'
                            onInput={handlePictureInput}
                        />
                    </label>
                </div>
                {picture !== null?
                    <>
                        <div style={{fontSize:'1.2rem', textAlign:'center'}}>
                            Picture is choosen!<br />
                            You can upload it<br />
                            using form below
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
                                className="upload-button"
                                onClick={handleUpload}
                            >
                                Upload Picture
                            </button>
                        </div>
                    </>
                    :null
                }
            </div>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        userJWT: store.userJWT,
        userName: store.userName,
        isLoggedIn: store.isLoggedIn
    }
}

const mapActionsToProps = dispatch => {
    return {
        addUserPost: bindActionCreators(addUserPost, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(AddPostForm)
