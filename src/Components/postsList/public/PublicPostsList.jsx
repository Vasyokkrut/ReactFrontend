import React from 'react';
import { connect } from 'react-redux'

import '../styles.css'
import AddPublicPost from './AddPublicPost.jsx'
import PublicPostItems from './PublicPostItems.jsx'

function PublicPostsList(props) {
    return(
        <div>
            <div style={{color:props.TextColor}} className='TextNode AccName'>
                Public posts
            </div>
            <AddPublicPost/>
            <PublicPostItems/>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        TextColor: store.theme==='dark'?'white':'black'
    }
}

export default connect(mapStateToProps, null)(PublicPostsList)
