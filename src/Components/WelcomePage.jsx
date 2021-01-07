import React from 'react';
import { Link } from 'react-router-dom'
import classnames from 'classnames'

function WelcomePage(props) {
    let className = classnames('WelcomeLink', 'Flexible', props.TextColor==='white'?'WhiteLink':'DarkLink')
    return(
        <div className='MainLink'>
            <div className='Flexible'>
                <Link
                    style={{color:props.TextColor, textAlign:'center', padding:'2rem'}}
                    className={className}
                    to='/upload'
                 >
                    Upload your own<br/>
                    picture here!
                </Link>
            </div>
        </div>
    )
}

export default WelcomePage
