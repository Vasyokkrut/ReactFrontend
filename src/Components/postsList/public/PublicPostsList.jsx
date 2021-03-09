import React, { useState } from 'react'

import AddPublicPost from './AddPublicPost.jsx'
import PublicPostItems from './PublicPostItems.jsx'

function PublicPostsList() {
    const [isDataLoaded, setIsDataLoaded] = useState(false)
    return(
        <div>
            {
                isDataLoaded
                ?
                <>
                    <div className='AccName'>
                        Public posts
                    </div>
                    <AddPublicPost/>
                </>
                :
                <div className='AccName'>loading...</div>
            }
            <PublicPostItems
                setIsDataLoaded={setIsDataLoaded}
                isDataLoaded={isDataLoaded}
            />
        </div>
    )
}

export default PublicPostsList
