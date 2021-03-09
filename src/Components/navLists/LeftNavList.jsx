import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { changePopUpDisplay } from '../../Store/actions.js'

function LeftList(props) {

    const linkClassName = classnames(
        props.darkTheme ?'darkLinkText':'lightLinkText'
    )

    const boxClassName = classnames(
        'Box',
        'LeftBox',
        props.darkTheme ? 'darkBox' : 'lightBox'
    )

    const itemClassName = classnames(
        'UsefulLink',
        props.darkTheme ? 'UsefulLinkLight' : 'UsefulLinkDark'
    )

    const separateLineClassName = classnames(
        'Separate-Line',
        props.darkTheme ? 'Separate-Line-Dark' : 'Separate-Line-Light'
    )

    return(
        <div className={boxClassName}>
            <div style={{fontSize:'2rem'}}>
                Post Lists:
            </div>
            <hr className={separateLineClassName} />
            <nav>
                <ul className='LeftList List'>
                    <li className={linkClassName}>
                        {
                        props.userName !== null
                        ?
                        <Link
                            className={itemClassName}
                            to={`/userPosts/${props.userName}`}
                        >
                            <span className='LinkText'>
                                <span style={{paddingLeft:'.4rem'}}>My Posts</span>
                            </span>
                        </Link>
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
        darkTheme: store.darkTheme,
        userName: store.userName
    }
}

const mapActionsToProps = dispatch => {
    return {
        changePopUpDisplay: bindActionCreators(changePopUpDisplay, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(LeftList)
