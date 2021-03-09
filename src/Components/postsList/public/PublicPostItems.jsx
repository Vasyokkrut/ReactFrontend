import React from 'react'
import axios from 'axios'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Picture from '../../Picture'
import Buttons from '../../buttons/functionalButtons'
import { setPublicPosts } from '../../../Store/actions.js'

class PublicPostItems extends React.Component {

    componentDidMount() {
        axios.get('/api/getPublicPosts')
            .then(publicPosts => {
                publicPosts = publicPosts.data.posts
                if (publicPosts.length) {
                    this.props.setPublicPosts(publicPosts.reverse())
                }
                this.props.setIsDataLoaded(true)
            })
    }

    render() {
        const PostClassName = classNames(
            'PostItem',
            this.props.darkTheme ? 'PostItemDark' : 'PostItemLight'
        )

        if(this.props.isDataLoaded === false) return null

        if(!this.props.publicPosts.length) {
            return (
                <div className='EmptyPost'>
                    Upload your own picture<br />
                    using button above!
                </div>
            )
        }

        return(
            this.props.publicPosts.map(item => {
                const pictureURL = `/api/getPublicPicture/${item._id}`
                return (
                    <div key={item._id} className={PostClassName}>
                        <div className='PostText'>
                            <span>{item.title}</span>
                        </div>
                        <Picture pictureURL={pictureURL} />
                        <Buttons
                            pictureURL={pictureURL}
                            item={item}
                            handleDeleteClick={() => {alert('you cannot delete public posts')}}
                            isDeleteAvailable={false}
                        />
                    </div>
                )
            })
        )
    }
}

const mapStateToProps = store => {
    return {
        darkTheme: store.darkTheme,
        publicPosts: store.publicPosts
    }
}

const mapActionsToProps = dispatch => {
    return {
        setPublicPosts: bindActionCreators(setPublicPosts, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(PublicPostItems)
