import React from 'react';
import { connect } from 'react-redux'

import '../styles.css'
import AddUserPost from './AddUserPost.jsx'
import UserPostItems from './UserPostItems.jsx'

function UserPostsList(props) {
    let URLUserName = props.match.params.URLUserName
    return(
        <div>
            <div style={{color:props.TextColor}} className='TextNode AccName'>
                {`${URLUserName} posts`}
            </div>
            <AddUserPost URLUserName={URLUserName} />
            <UserPostItems URLUserName={URLUserName} />
        </div>
    )
}

const mapStateToProps = store => {
    return {
        TextColor: store.theme==='dark'?'white':'black'
    }
}

export default connect(mapStateToProps, null)(UserPostsList)
