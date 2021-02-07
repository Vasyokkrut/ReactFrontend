import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './styles.css'
import {changeTheme, userLogout, changePopUpDisplay} from '../../Store/actions.js'

function RightList(props) {

    let itemClassName=classnames('UsefulLink', props.TextColor==='black'?'UsefulLinkDark':'UsefulLinkLight')
    let boxClassName=classnames(props.TextColor==='black'?'lightBox':'darkBox', 'RightBox', 'Box')
    let linkClassName=classnames(props.TextColor==='black'?'lightLinkText':'darkLinkText')
    return(
        <div className={boxClassName}>
            <div style={{color:props.TextColor, fontSize:'1.7rem'}}>
                Settings:
            </div>
            <hr style={{ height:'2px', color:'#666', borderWidth:'0' , backgroundColor:'#666'}} />
            <nav>
                <ul className='RightList List'>
                    <li className={linkClassName}>
                        <a
                            className={itemClassName}
                            rel='noreferrer noopener'
                            target='_blank'
                            href='https://learn.javascript.ru/promise'
                        >
                            <span className='LinkText'>
                                <span style={{paddingLeft:'.4rem'}}>login logout</span>
                            </span>
                        </a>
                    </li>
                    <li className={linkClassName}>
                        <a
                            className={itemClassName}
                            rel='noopener noreferrer'
                            target='_blank'
                            href='https://learn.javascript.ru/function-basics'
                        >
                            <span className='LinkText'>
                                <span style={{paddingLeft:'.4rem'}}>change theme</span>
                            </span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

const mapStateToProps = store => {
    return {
      isLoggedin:store.isLoggedin
    }
}

const mapActionsToProps = dispatch => {
    return {
        changeTheme: bindActionCreators(changeTheme, dispatch),
        userLogout: bindActionCreators(userLogout, dispatch),
        changePopUpDisplay: bindActionCreators(changePopUpDisplay, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(RightList)
