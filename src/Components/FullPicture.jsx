import React from 'react';

function FullPicture(props) {
    document.getElementsByTagName('html')[0].style.height='100%'
    document.body.style.height='100%'
    document.body.className = 'dark'
    document.getElementById('root').style.height='100%'
    return(
        <div className='FullPicture'>
            <img
                style={{margin:'auto'}}
                src={`${props.location.pathname}`}
                alt='There is a beautiful car'
            />
        </div>
    )
}

export default FullPicture
