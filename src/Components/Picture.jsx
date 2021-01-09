import React from 'react'

function Picture({itemName}) {

  return(
    <div className='Flexible'>
      <img
        src={itemName}
        width='600'
        alt='There is a beautiful car'
      />
    </div>
  )
}

export default Picture
