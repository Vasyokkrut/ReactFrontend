import React from 'react'

function Picture({itemName}) {

  return(
    <div className='Flexible PictureContainer'>
      <img
        src={itemName}
        alt='There is a beautiful car'
        className='postPicture'
      />
    </div>
  )
}

export default Picture
