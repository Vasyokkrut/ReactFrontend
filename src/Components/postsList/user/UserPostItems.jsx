import React from 'react'
import axios from 'axios'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Picture from '../../Picture'
import Buttons from '../../buttons/functionalButtons'
import { deleteUserPost, setUserPosts, userLogout } from '../../../Store/actions.js'

class PostItems extends React.Component {
    constructor(props) {
        super(props)
        this.state = {isDataLoaded: false}
    }

    async componentDidMount() {
        try {
            let posts = await axios.get(`/api/getUserImages/${this.props.URLUserName}`)
            posts = posts.data.images
            this.props.setUserPosts(posts.reverse())
            this.setState({isDataLoaded: true})
        } catch {
            this.props.setUserPosts(null)
            this.setState({isDataLoaded: true})
        }
    }

    handleDeleteClick(fileName) {
        axios.delete(
            '/api/deleteUserImage',
            {
                data:{
                    delete:fileName,
                    userName:this.props.userName
                },
                headers:{
                    'Authorization': this.props.JWTToken
                } 
            }
        )
        .then(res => {if(res.data.deleted === true) this.props.deleteUserPost(fileName) })
        .catch(() => {alert('whoops, we cant delete this post')})
    }

    render() {
        let PostClassName = classNames('PostItem', this.props.theme==='dark'?'PostItemDark':'PostItemLight')

        // show nothing unless data is loaded to prevent flicker
        if(this.state.isDataLoaded === false) return null

        // if user doesn't exist this message will be displayed
        if(this.props.userPosts === null) {
            return (
                <div className='EmptyPost'>
                    User Doesn't exist
                </div>
            )
        }

        // if user has not any posts this message will be displayed
        if(this.props.userPosts.length === 0) {
            return (
                <div className='EmptyPost'>
                    Upload your own picture<br />
                    using button above!
                </div>
            )
        }

        // if user has posts they will be displayed
        return(
            this.props.userPosts.map(item => {
                let itemURL=`/api/getUserImage/${this.props.URLUserName}/${item._id}`
                return (
                    <div key={item._id} className={PostClassName}>
                        <div className='PostText'>
                            <span>{item.name}</span>
                        </div>
                        <Picture itemURL={itemURL} />
                        <Buttons
                            itemURL={itemURL}
                            item={item}
                            handleDeleteClick={this.handleDeleteClick.bind(this)}
                            isDeleteAvailable={this.props.URLUserName === this.props.userName}
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
        isLoggedin: store.isLoggedin,
        userName: store.userName,
        userPosts: store.userPosts,
        JWTToken: store.userJWTToken
    }
}

const mapActionsToProps = dispatch => {
    return {
        userLogout: bindActionCreators(userLogout, dispatch),
        setUserPosts: bindActionCreators(setUserPosts, dispatch),
        deleteUserPost: bindActionCreators(deleteUserPost, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(PostItems)
