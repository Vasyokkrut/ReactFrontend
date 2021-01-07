import React from 'react'
import classnames from 'classnames'
import './styles.css'

function RightList(props) {

    let itemClassName=classnames('UsefulLink', props.TextColor==='black'?'UsefulLinkDark':'UsefulLinkLight')
    let listClassName=classnames(props.TextColor==='black'?'lightBox':'darkBox', 'RightBox', 'Box')
    let linkClassName=classnames(props.TextColor==='black'?'lightLinkText':'darkLinkText')
    return(
        <div className={listClassName}>
            <div style={{color:props.TextColor, fontSize:'1.7rem'}}>
                JavaScript links:
            </div>
            <hr style={{ height:'2px', color:'#666', borderWidth:'0' , backgroundColor:'#666'}} />
            <nav>
                <ul className='RightList List'>
                    <li className={linkClassName}>
                        <a className={itemClassName} rel='noreferrer noopener' target='_blank' href='https://learn.javascript.ru/promise'>
                            <span className='LinkText'><span style={{paddingLeft:'.4rem'}}>JavaScript promises</span></span>
                        </a>
                    </li>
                    <li className={linkClassName}>
                        <a className={itemClassName} rel='noopener noreferrer' target='_blank' href='https://learn.javascript.ru/function-basics'>
                            <span className='LinkText'><span style={{paddingLeft:'.4rem'}}>JavaScript functions</span></span>
                        </a>
                    </li>
                    <li className={linkClassName}>
                        <a className={itemClassName} rel='noopener noreferrer' target='_blank' href='https://learn.javascript.ru/modules-intro'>
                            <span className='LinkText'><span style={{paddingLeft:'.4rem'}}>JavaScript imports</span></span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default RightList
