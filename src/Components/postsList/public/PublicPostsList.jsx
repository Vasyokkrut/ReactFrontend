import React, { useState } from 'react'

import AddPublicPost from './AddPublicPost.jsx'
import PublicPostItems from './PublicPostItems.jsx'

function PublicPostsList() {
    let [isDataLoaded, setIsDataLoaded] = useState(false)
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
                null
            }
            <PublicPostItems
                setIsDataLoaded={setIsDataLoaded}
                isDataLoaded={isDataLoaded}
            />
        </div>
    )
}

export default PublicPostsList
