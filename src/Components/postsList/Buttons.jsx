import classNames from 'classnames'
import { connect } from 'react-redux'

import './styles.scss'

// There are three buttons which appear under a picture
// They allow user to download, open and delete pictures
// Delete button doesn't appear on public posts and on foreign user's posts
function Buttons({item, pictureURL, handleDeleteClick, isDeleteAvailable, isDarkTheme}) {

  // Since react dev server and backend server in development mode are different servers
  // and react doesn't proxying href attribute for <a> tag
  // we should explicitly add backend server hostname to href in development mode
  // In production mode there will be only one server
  let downloadHref = `/api/posts/downloadPicture/${item.pictureName}`

  if (process.env.NODE_ENV !== 'production') {
    pictureURL = 'http://localhost:5000' + pictureURL
    downloadHref = 'http://localhost:5000' + downloadHref
  }

  const buttonClassName = classNames(
    isDarkTheme ? 'post-button-dark' : 'post-button-light',
    'primary-button',
    'post-button'
  )

  return(
    <div className='flex-center'>
      {isDeleteAvailable ? (
        <button
          onClick={() => handleDeleteClick(item._id)}
          className={buttonClassName}
        >
          Delete this post
        </button>
      ) : null}
      <a
        className={buttonClassName}
        rel='noopener noreferrer'
        target='_blank'
        href={pictureURL}
      >
        Open full picture
      </a>
      <a
        className={buttonClassName}
        href={downloadHref}
      >
        Download picture
      </a>
    </div>
  )
}

const mapStateToProps = store => {
  return {
    isDarkTheme: store.appearance.isDarkTheme
  }
}

export default connect(mapStateToProps)(Buttons)
