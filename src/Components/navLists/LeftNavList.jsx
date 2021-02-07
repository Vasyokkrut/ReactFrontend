import React from 'react'
import classnames from 'classnames'
import './styles.css'

function LeftList(props) {
    let itemClassName=classnames('UsefulLink', props.TextColor==='black'?'UsefulLinkDark':'UsefulLinkLight')
    let boxClassName=classnames(props.TextColor==='black'?'lightBox':'darkBox', 'LeftBox', 'Box')
    let linkClassName=classnames(props.TextColor==='black'?'lightLinkText':'darkLinkText')
    return(
        <div className={boxClassName}>
            <div style={{color:props.TextColor, fontSize:'1.7rem'}}>
                Post Lists:
            </div>
            <hr style={{ height:'2px', color:'#666', borderWidth:'0' , backgroundColor:'#666'}} />
            <nav>
                <ul className='LeftList List'>
                    <li className={linkClassName}>
                        <a
                            className={itemClassName}
                            href={`/userPosts/${props.userName}`}
                        >
                            <span className='LinkText'>
                                <span style={{paddingLeft:'.4rem'}}>{props.userName} Posts</span>
                            </span>
                        </a>
                    </li>
                    <li className={linkClassName}>
                        <a
                            className={itemClassName}
                            href='/publicPosts'
                        >
                            <span className='LinkText'>
                                <span style={{paddingLeft:'.4rem'}}>Public Posts</span>
                            </span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default LeftList
