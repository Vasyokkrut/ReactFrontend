import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { changePopUpDisplay, setUserPosts } from '../../Store/actions.js'

function LeftList(props) {

    let linkClassName=classnames(props.theme==='light'?'lightLinkText':'darkLinkText')
    let boxClassName=classnames(props.theme==='light'?'lightBox':'darkBox', 'LeftBox', 'Box')
    let itemClassName=classnames('UsefulLink', props.theme==='light'?'UsefulLinkDark':'UsefulLinkLight')

    return(
        <div className={boxClassName}>
            <div style={{fontSize:'2rem'}}>
                Post Lists:
            </div>
            <hr style={{ height:'2px', color:'#666', borderWidth:'0' , backgroundColor:'#666'}} />
            <nav>
                <ul className='LeftList List'>
                    <li className={linkClassName}>
                        {
                        props.userName !== null
                        ?
                        <a
                            className={itemClassName}
                            href={`/userPosts/${props.userName}`}
                        >
                            <span className='LinkText'>
                                <span style={{paddingLeft:'.4rem'}}>My Posts</span>
                            </span>
                        </a>
                        :
                        <span
                            className={itemClassName}
                            onClick={props.changePopUpDisplay}
                        >
                            <span className='LinkText'>
                                <span style={{paddingLeft:'.4rem'}}>My Posts</span>
                            </span>
                        </span>
                        }
                    </li>
                    <li className={linkClassName}>
                        <Link
                            className={itemClassName}
                            to='/publicPosts'
                        >
                            <span className='LinkText'>
                                <span style={{paddingLeft:'.4rem'}}>Public Posts</span>
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        theme: store.theme,
        userName: store.userName
    }
}

const mapActionsToProps = dispatch => {
    return {
        setUserPosts: bindActionCreators(setUserPosts, dispatch),
        changePopUpDisplay: bindActionCreators(changePopUpDisplay, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(LeftList)
