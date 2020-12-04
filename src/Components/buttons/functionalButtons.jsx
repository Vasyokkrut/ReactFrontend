import React from 'react'

function Buttons({item, itemFolder, handleDeleteClick}) {
    return(
        <div className='Flexible'>
            <button
                onClick={() => handleDeleteClick(item._id)}
                className='BtnFullPicture'
            >
                Delete this image
            </button>
            <a
                className='BtnFullPicture'
                rel='noopener noreferrer'
                target='_blank'
                href= {itemFolder}
                style={{font:'1rem Arial'}}
            >
                Open full image
            </a>
            <a
                style={{font:'1rem Arial'}}
                className='BtnFullPicture'
                href={`http://127.0.0.1:5000/downloadPicture/${item.fileName}`}
            >
                Download
            </a>
        </div>
    )
}

export default Buttons