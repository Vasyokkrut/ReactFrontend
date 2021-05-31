import React, { useState } from 'react'

import AddPostForm from './addPostForm.jsx'
import PostItems from './postItems.jsx'

function PostsList(props) {
  const userNameFromURL = props.match.params.username
  const [userName, setUserName] = useState(null)

  return(
    <div>
      {
        userName !== null
        ?
        <>
          <div className='account-name'>
            {userName + ' posts'}
          </div>
          <AddPostForm userNameFromURL={userNameFromURL} />
        </>
        :
        null
      }
      <PostItems userNameFromURL={userNameFromURL} setUserName={setUserName} />
    </div>
  )
}

export default PostsList
