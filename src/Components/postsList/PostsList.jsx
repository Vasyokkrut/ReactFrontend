import React, { useState } from 'react'

import AddUserPost from './AddPost.jsx'
import PostItems from './PostItems.jsx'

function UserPostsList(props) {
  const URLUserName = props.match.params.URLUserName
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
          <AddUserPost URLUserName={URLUserName} />
        </>
        :
        null
      }
      <PostItems URLUserName={URLUserName} setUserName={setUserName} />
    </div>
  )
}

export default UserPostsList
