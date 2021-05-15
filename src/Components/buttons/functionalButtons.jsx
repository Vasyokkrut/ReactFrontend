import './styles.scss'

// There are three buttons which appear under a picture
// They allow user to download, open and delete pictures
// Delete button doesn't appear on public posts and on foreign user's posts
function Buttons({item, pictureURL, handleDeleteClick, isDeleteAvailable}) {

  // Since react dev server and backend server in development mode are different servers
  // and react doesn't proxying href attribute for <a> tag
  // we should explicitly add backend server hostname to href in development mode
  // In production mode there will be only one server

  let downloadHref = `/api/downloadPicture/${item.pictureName}`

  if (process.env.NODE_ENV !== 'production') {
    pictureURL = 'http://localhost:5000' + pictureURL
    downloadHref = 'http://localhost:5000' + downloadHref
  }

  return(
    <div className='flex-center'>
      {isDeleteAvailable ? (
        <button
          onClick={() => handleDeleteClick(item._id)}
          className='primary-button'
        >
          Delete this post
        </button>
      ) : null}
      <a
        className='primary-button'
        rel='noopener noreferrer'
        target='_blank'
        href={pictureURL}
      >
        Open full picture
      </a>
      <a
        className='primary-button'
        href={downloadHref}
      >
        Download
      </a>
    </div>
  )
}

export default Buttons
