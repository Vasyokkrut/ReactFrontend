function Picture({pictureURL}) {

  return(
    <div className='flex-center picture-container'>
      <img
        src={pictureURL}
        alt='There is a beautiful car'
        className='post-picture'
      />
    </div>
  )
}

export default Picture
