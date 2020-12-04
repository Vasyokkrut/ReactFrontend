import React from 'react'
import classnames from 'classnames'
import './styles.css'

function LeftList(props) {
    let itemClassName=classnames('UsefulLink', props.TextColor==='black'?'UsefulLinkDark':'UsefulLinkLight')
    let listClassName=classnames(props.TextColor==='black'?'lightBox':'darkBox', 'LeftBox', 'Box')
    let linkClassName=classnames(props.TextColor==='black'?'lightLinkText':'darkLinkText')
    return(
        <div className={listClassName}>
            <div style={{color:props.TextColor, fontSize:'1.7rem'}}>
                React useful links:
            </div>
            <hr style={{ height:'2px', color:'#666', borderWidth:'0' , backgroundColor:'#666'}} />
            <nav>
                <ul className='LeftList List'>
                    <li className={linkClassName}>
                        <a className={itemClassName} rel='noreferrer noopener' target='_blank' href='https://ru.reactjs.org/docs/react-component.html'>
                            <span className='LinkText'><span style={{paddingLeft:'.4rem'}}>React Component</span></span>
                        </a>
                    </li>
                    <li className={linkClassName}>
                        <a className={itemClassName} rel='noopener noreferrer' target='_blank' href='https://ru.reactjs.org/docs/fragments.html'>
                            <span className='LinkText'><span style={{paddingLeft:'.4rem'}}>React Fragment</span></span>
                        </a>
                    </li>
                    <li className={linkClassName}>
                        <a className={itemClassName} rel='noopener noreferrer' target='_blank' href='https://ru.reactjs.org/docs/hooks-intro.html'>
                            <span className='LinkText'><span style={{paddingLeft:'.4rem'}}>React Hooks</span></span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default LeftList