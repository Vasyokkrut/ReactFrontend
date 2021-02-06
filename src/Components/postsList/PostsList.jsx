import React from 'react';
import PostItems from './PostItems.jsx'
import AddPostForm from '../AddPostForm.jsx'
import './styles.css'

function PostsList({TextColor}) {
    return(
        <div>
            <AddPostForm TextColor={TextColor} />
            <PostItems TextColor={TextColor} />
        </div>
    )
}

export default PostsList
