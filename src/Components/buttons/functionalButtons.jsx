import React from 'react'
import './styles.css'

function Buttons({item, itemFolder, handleDeleteClick, isDeleteAvailable}) {
    return(
        <div className='Flexible'>
            {isDeleteAvailable ? (
                <button
                    onClick={() => handleDeleteClick(item._id)}
                    className='BtnFullPicture'
                >
                    Delete this image
                </button>
            ) : (
                null
            )
            }
            <a
                className='BtnFullPicture'
                rel='noopener noreferrer'
                target='_blank'
                href= {itemFolder}
            >
                Open full image
            </a>
            <a
                className='BtnFullPicture'
                href={`/downloadPicture/${item.fileName}`}
            >
                Download
            </a>
        </div>
    )
}

export default Buttons
