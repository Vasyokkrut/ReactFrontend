import classNames from 'classnames'
import { connect } from 'react-redux'

function PostItem({
  item,
  userName,
  isDarkTheme,
  isDeleteAvailable,
  sendDeleteRequest
}) {
  let downloadLink = `/api/posts/downloadPicture/${item.pictureName}`
  let pictureURL = `/api/posts/getPostPicture/${userName}/${item._id}`

  if (process.env.NODE_ENV !== 'production') {
    pictureURL = 'http://localhost:5000' + pictureURL
    downloadLink = 'http://localhost:5000' + downloadLink
  }

  const buttonClassName = classNames(
    isDarkTheme ? 'post-button-dark' : 'post-button-light',
    'primary-button',
    'post-button'
  )

  const PostClassName = classNames(
    isDarkTheme ? 'post-item-dark' : 'post-item-light',
    'post-item'
  )

  return (
    <div className={PostClassName}>
      <div className='post-title'>
        {item.title}
      </div>
      <div className='post-text' >
        {item.text}
      </div>
      <div className='flex-center post-picture-container'>
        <img src={pictureURL} alt='There is a beautiful car' className='post-picture' />
      </div>
      <div className='flex-center'>
        {isDeleteAvailable ? (
          <button
            onClick={() => sendDeleteRequest(item._id)}
            className={buttonClassName}
          >Delete this post</button>
        ) : null}
        <a
          className={buttonClassName}
          rel='noopener noreferrer'
          target='_blank'
          href={pictureURL}
        >Open full picture</a>
        <a
          className={buttonClassName}
          href={downloadLink}
        >Download picture</a>
      </div>
    </div>
  )
}

const mapStateToProps = store => {
  return {
    isDarkTheme: store.appearance.isDarkTheme
  }
}

export default connect(mapStateToProps)(PostItem)
