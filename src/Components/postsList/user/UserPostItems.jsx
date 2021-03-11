import React from 'react'
import axios from 'axios'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Picture from '../../Picture'
import Buttons from '../../buttons/functionalButtons'
import { deleteUserPost, setUserPosts } from '../../../Store/actions.js'

class PostItems extends React.Component {
    constructor(props) {
        super(props)
        this.state = {isDataLoaded: false, URLUserName: props.URLUserName}
    }

    componentDidMount() {
        axios.get(`/api/getUserInfo/${this.props.URLUserName}`)
            .then(res => {
                const {userPosts, userName} = res.data
                this.props.setUserName(userName)
                this.props.setUserPosts(userPosts.reverse())
            })
            .catch(() => {
                this.props.setUserPosts(null)
            })
            .finally(() => {
                this.setState({...this.state, isDataLoaded: true})
            })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.URLUserName !== this.props.URLUserName) {
            this.props.setUserName(null)
            this.setState({...this.state, isDataLoaded: false})
            
            axios.get(`/api/getUserInfo/${this.props.URLUserName}`)
                .then(res => {
                    const {userPosts, userName} = res.data
                    this.props.setUserName(userName)
                    this.props.setUserPosts(userPosts.reverse())
                })
                .catch(() => {
                    this.props.setUserPosts(null)
                })
                .finally(() => {
                    this.setState({isDataLoaded: true, URLUserName: this.props.URLUserName})
                })
        }
    }

    handleDeleteClick(fileName) {
        axios.delete(
            '/api/deleteUserPost',
            {
                data:{
                    delete: fileName,
                    userName: this.props.userName
                },
                headers:{
                    Authorization: 'Bearer ' + this.props.userJWT
                } 
            }
        )
        .then(res => {if(res.data.deleted === true) this.props.deleteUserPost(fileName) })
        .catch(() => {alert('whoops, we cannot delete this post')})
    }

    render() {
        const PostClassName = classNames(
            'post-item',
            this.props.darkTheme ? 'post-item-dark' : 'post-item-light'
        )

        // show nothing unless data is loaded to prevent flicker
        if(this.state.isDataLoaded === false) return <div className='account-name'>loading...</div>

        // if user doesn't exist this message will be displayed
        if(this.props.userPosts === null) {
            return (
                <div className='empty-post'>
                    User doesn't exist
                </div>
            )
        }

        // if user has not any posts this message will be displayed
        if(this.props.userPosts.length === 0) {
            return (
                <div className='empty-post'>
                    Upload your own picture<br />
                    using button above!
                </div>
            )
        }

        // if user has posts they will be displayed
        return(
            this.props.userPosts.map(item => {
                const pictureURL = `/api/getUserPicture/${this.state.URLUserName}/${item._id}`
                return (
                    <div key={item._id} className={PostClassName}>
                        <div className='post-title'>
                            <span>{item.title}</span>
                        </div>
                        <Picture pictureURL={pictureURL} />
                        <Buttons
                            pictureURL={pictureURL}
                            item={item}
                            handleDeleteClick={this.handleDeleteClick.bind(this)}
                            isDeleteAvailable={this.props.URLUserName.toLowerCase() === this.props.userName?.toLowerCase()}
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
        isLoggedIn: store.isLoggedIn,
        userName: store.userName,
        userPosts: store.userPosts,
        userJWT: store.userJWT
    }
}

const mapActionsToProps = dispatch => {
    return {
        setUserPosts: bindActionCreators(setUserPosts, dispatch),
        deleteUserPost: bindActionCreators(deleteUserPost, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(PostItems)
