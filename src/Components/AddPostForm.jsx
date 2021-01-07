import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addPost, addUserPost } from '../Store/actions.js'

function AddPostForm(props) {
    let [Picture, setPicture] = useState(null)
    let [Title, setTitle] = useState('')

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
                await axios.post('/api/uploadPictureForUser', fd, {headers:{'Authorization': props.JWTToken}})
                .then(response => {
                    props.addUserPost(response.data)
                    setPicture(null)
                    setTitle('')
                    document.getElementById('InputField').value=''
                })
            } else {
                await axios.post('/api/uploadPicture', fd)
                .then(response => {
                    props.addPost(response.data.post)
                    setPicture(null)
                    setTitle('')
                    document.getElementById('InputField').value=''
                })
            }
        }
    }

    return(
        <React.Fragment>
            <div className='Flexible'>
                <div>
                    <div className='Flexible'>
                        <label className='button button1' style={{font:'1rem Arial'}}>
                            {Picture===null?'Choose picture':'Rechoose picture'}
                            <input id='InputField' type='file' onInput={handlePictureInput} />
                        </label>
                    </div>
                    {Picture!==null?
                        <React.Fragment>
                            <div style={{color:props.TextColor, fontSize:'1.2rem', textAlign:'center'}}>
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
                                    className="button button1"
                                    onClick={handleUpload}
                                >
                                    Upload Picture
                                </button>
                            </div>
                        </React.Fragment>
                        :null
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = store => {
    return {
        isLoggedin: store.isLoggedin,
        userName: store.userName,
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
