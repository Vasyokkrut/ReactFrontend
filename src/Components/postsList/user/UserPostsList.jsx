import React from 'react'

import AddUserPost from './AddUserPost.jsx'
import UserPostItems from './UserPostItems.jsx'

function UserPostsList(props) {
    let URLUserName = props.match.params.URLUserName
    return(
        <div>
            <div className='TextNode AccName'>
                {`${URLUserName} posts`}
            </div>
            <AddUserPost URLUserName={URLUserName} />
            <UserPostItems URLUserName={URLUserName} />
        </div>
    )
}

export default UserPostsList
