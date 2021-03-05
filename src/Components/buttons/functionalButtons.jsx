import React from 'react'

import './styles.css'

// There are three buttons which appear under a picture
// They allow user to download, open and delete pictures
// Delete button doesn't appear on public posts and on foreign user's posts
function Buttons({item, pictureURL, handleDeleteClick, isDeleteAvailable}) {

    // Since react dev server and backend server in development mode are different servers
    // and react doesn't proxying href attribute for <a> tag
    // we should explicitly add backend server hostname to href in development mode
    // In production mode there will be only one server

    let downloadHref = `/downloadPicture/${item.fileName}`

    if (process.env.NODE_ENV === 'development') {
        downloadHref = 'http://localhost:5000' + downloadHref
    }

    if (process.env.NODE_ENV === 'development') {
        pictureURL = 'http://localhost:5000' + pictureURL
    }

    return(
        <div className='Flexible'>
            {isDeleteAvailable ? (
                <button
                    onClick={() => handleDeleteClick(item._id)}
                    className='BtnFullPicture'
                >
                    Delete this post
                </button>
            ) : null}
            <a
                className='BtnFullPicture'
                rel='noopener noreferrer'
                target='_blank'
                href={pictureURL}
            >
                Open full image
            </a>
            <a
                className='BtnFullPicture'
                href={downloadHref}
            >
                Download
            </a>
        </div>
    )
}

export default Buttons
