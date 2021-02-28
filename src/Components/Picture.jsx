import React from 'react'

function Picture({pictureURL}) {

  return(
    <div className='Flexible PictureContainer'>
      <img
        src={pictureURL}
        alt='There is a beautiful car'
        className='postPicture'
      />
    </div>
  )
}

export default Picture
