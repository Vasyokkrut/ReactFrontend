import React, { useState } from 'react'

import AddUserPost from './AddUserPost.jsx'
import UserPostItems from './UserPostItems.jsx'

function UserPostsList(props) {
    let URLUserName = props.match.params.URLUserName
    let [userName, setUserName] = useState(null)
    return(
        <div>
            {
                userName !== null
                ?
                <>
                    <div className='AccName'>
                        {userName + ' posts'}
                    </div>
                    <AddUserPost URLUserName={URLUserName} />
                </>
                :
                <div className='AccName'>Loading...</div>
            }
            <UserPostItems URLUserName={URLUserName} setUserName={setUserName} />
        </div>
    )
}

export default UserPostsList
