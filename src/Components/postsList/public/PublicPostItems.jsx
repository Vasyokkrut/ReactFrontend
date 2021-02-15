import React from 'react'
import axios from 'axios'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Picture from '../../Picture'
import { setPosts } from '../../../Store/actions.js'
import Buttons from '../../buttons/functionalButtons'

class PublicPostItems extends React.Component {

    constructor(props) {
        super(props)
        this.state = {isDataLoaded: false}
    }

    componentDidMount() {
        axios.get('/api/getImages')
            .then(publicPosts => {
                publicPosts = publicPosts.data.images
                if (publicPosts.length) {
                    this.props.setPosts(publicPosts.reverse())
                }
                this.setState({isDataLoaded: true})
            })
    }

    render() {
        let PostClassName = classNames('PostItem', this.props.theme==='dark'?'PostItemDark':'PostItemLight')

        if(this.state.isDataLoaded === false) return null

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
                let itemURL = `/api/getImage/${item._id}`
                return (
                    <div key={item._id} className={PostClassName}>
                        <div className='PostText'>
                            <span>{item.name}</span>
                        </div>
                        <Picture itemURL={itemURL} />
                        <Buttons
                            itemURL={itemURL}
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
        theme: store.theme,
        publicPosts: store.posts
    }
}

const mapActionsToProps = dispatch => {
    return {
        setPosts: bindActionCreators(setPosts, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(PublicPostItems)
