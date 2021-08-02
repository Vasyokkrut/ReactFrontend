import classNames from 'classnames'
import { connect } from 'react-redux'

function PostItem({
  item,
  isDarkTheme,
  windowWidth,
  isDeleteAvailable,
  sendDeleteRequest
}) {
  let pictureLink = `/api/posts/getPostPicture/${item.pictureName}`
  let downloadLink = `/api/posts/downloadPicture/${item.pictureName}`

  if (process.env.NODE_ENV !== 'production') {
    pictureLink = `http://${window.location.hostname}:5000${pictureLink}`
    downloadLink = `http://${window.location.hostname}:5000${downloadLink}`
  }

  const buttonClassName = classNames(
    isDarkTheme ? 'post-button-dark' : 'post-button-light',
    'primary-button',
    'post-button'
  )

  const deleteButtonClassName = classNames(
    isDarkTheme ? 'post-button-dark' : 'post-button-light',
    'primary-button',
    'post-button',
    'post-button-delete',
    isDarkTheme ? 'post-button-delete-dark' : 'post-button-delete-light',
    )

  const PostClassName = classNames(
    isDarkTheme ? 'post-item-dark' : 'post-item-light',
    'post-item'
  )

  const imageWidth = item.pictureSize.width
  const imageHeight = item.pictureSize.height

  function getImageContainerHeight() {
    const designBreakpoint = 672 // 42rem is main breakpoint throughout entire app for responsive design
    const maxDesktopWidth = 600 // 600px is max width fot image in posts for desktop design
    const maxDesktopHeight = 400 // 400px is max height for image in posts for desktop design
    const isMobileDesign = window.innerWidth < designBreakpoint
    const maxWidth = isMobileDesign ? windowWidth : maxDesktopWidth
    const maxHeight = isMobileDesign ? maxDesktopHeight * windowWidth / maxDesktopWidth : maxDesktopHeight
    const minAspectRatio = maxWidth / maxHeight

    if (imageWidth < maxWidth) {
      if (imageHeight < maxHeight) {
        return imageHeight
      } else {
        return maxHeight
      }
    }

    if (imageHeight < maxHeight) {
      if (imageWidth > maxWidth) {
        return maxHeight * minAspectRatio * imageHeight / imageWidth
      } else {
        return imageHeight
      }
    }

    if (imageWidth / imageHeight < minAspectRatio) {
      return maxHeight
    } else {
      return maxHeight * minAspectRatio * imageHeight / imageWidth
    }
  }

  const imageContainerHeight = getImageContainerHeight() + 'px'

  return (
    <div className={PostClassName}>
      <div className='post-title'>
        {item.title}
      </div>
      <div className='post-text' >
        {item.text}
      </div>
      <div style={{height: imageContainerHeight}} className='flex-center post-picture-container'>
        <div className='post-picture' style={{backgroundImage: `url(${pictureLink})`}} >
          <img src={pictureLink} alt='Sorry, we cant load this file' />
        </div>
      </div>
      <div className='post-buttons-container' >
        {
          isDeleteAvailable ?
          <button
            onClick={() => sendDeleteRequest(item._id)}
            className={deleteButtonClassName}
          >Delete</button>
          : null
        }
        <a
          className={buttonClassName}
          rel='noopener noreferrer'
          target='_blank'
          href={pictureLink}
        >full picture</a>
        <a
          className={buttonClassName}
          href={downloadLink}
        >Download</a>
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
