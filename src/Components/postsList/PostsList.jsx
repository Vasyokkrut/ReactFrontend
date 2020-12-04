import React from 'react';
import Post from './PostItem.jsx'
import AddPostForm from '../AddPostForm.jsx'
import './styles.css'

function MainList({TextColor}) {
    return(
        <div>
            <AddPostForm
                TextColor={TextColor}
            />
            <div>
                <Post
                    TextColor={TextColor}
                />
            </div>
        </div>
    )
}

export default MainList