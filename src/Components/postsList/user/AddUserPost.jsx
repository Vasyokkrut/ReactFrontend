import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addPost, addUserPost } from '../../../Store/actions.js'

function AddPostForm(props) {
    const [Picture, setPicture] = useState(null)
    const [Title, setTitle] = useState('')

    function handlePictureInput(event) {
        setPicture(event.target.files[0])
    }

    function handleTitleInput(event) {
        setTitle(event.target.value)
    }

    async function handleUpload() {
        if(Picture !== null) {
            let fd = new FormData()
            fd.append('image', Picture)
            fd.append('title', Title)
            fd.append('userName', props.userName)
            if(props.isLoggedin) {
                await axios.put('/api/uploadPictureForUser', fd, {headers:{'Authorization': 'Bearer ' + props.JWTToken}})
                .then(response => {
                    props.addUserPost(response.data)
                    setPicture(null)
                    setTitle('')
                    document.getElementById('InputField').value=''
                })
            }
        }
    }

    if (!props.isLoggedin || props.userName.toLowerCase() !== props.URLUserName.toLowerCase()) return null

    return(
        <div className='Flexible'>
            <div>
                <div className='Flexible'>
                    <label className='UploadBtn'>
                        {Picture===null?'Create Post':'Rechoose picture'}
                        <input
                            id='InputField'
                            accept='image/*'
                            type='file'
                            onInput={handlePictureInput}
                        />
                    </label>
                </div>
                {Picture!==null?
                    <>
                        <div style={{fontSize:'1.2rem', textAlign:'center'}}>
                            Picture is choosen!<br />
                            You can upload it<br />
                            using form below
                        </div>
                        <input
                            className='PictureInput'
                            type='text'
                            placeholder='Choose title'
                            onChange={handleTitleInput}
                            value={Title}
                        />
                        <div className='Flexible'>
                            <button
                                className="UploadBtn"
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
        userName: store.userName,
        isLoggedin: store.isLoggedin,
        JWTToken: store.userJWTToken
    }
}

const mapActionsToProps = dispatch => {
    return {
        addPost: bindActionCreators(addPost, dispatch),
        addUserPost: bindActionCreators(addUserPost, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(AddPostForm)
