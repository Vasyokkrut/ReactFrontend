import React from 'react';
import PostItems from './PostItems.jsx'
import AddPostForm from '../AddPostForm.jsx'
import './styles.css'

function PostsList() {
    return(
        <div>
            <AddPostForm/>
            <PostItems/>
        </div>
    )
}

export default PostsList
