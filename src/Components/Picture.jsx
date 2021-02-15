import React from 'react'

function Picture({itemURL}) {

  return(
    <div className='Flexible PictureContainer'>
      <img
        src={itemURL}
        alt='There is a beautiful car'
        className='postPicture'
      />
    </div>
  )
}

export default Picture
