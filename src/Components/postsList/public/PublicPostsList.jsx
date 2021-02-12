import React from 'react'

import AddPublicPost from './AddPublicPost.jsx'
import PublicPostItems from './PublicPostItems.jsx'

function PublicPostsList() {
    return(
        <div>
            <div className='TextNode AccName'>
                Public posts
            </div>
            <AddPublicPost/>
            <PublicPostItems/>
        </div>
    )
}

export default PublicPostsList
