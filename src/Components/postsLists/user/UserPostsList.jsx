import React, { useState } from 'react'

import AddUserPost from './AddUserPost.jsx'
import UserPostItems from './UserPostItems.jsx'

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
      <UserPostItems URLUserName={URLUserName} setUserName={setUserName} />
    </div>
  )
}

export default UserPostsList
