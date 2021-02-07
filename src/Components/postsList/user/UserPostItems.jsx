import React from 'react'
import axios from 'axios'
import Picture from '../../Picture'
import Buttons from '../../buttons/functionalButtons'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deleteUserPost, setUserPosts } from '../../../Store/actions.js'

class PostItems extends React.Component {

    async componentDidMount() {
        try {
            let posts = await axios.get(`/api/getUserImages/${this.props.URLUserName}`)
            posts = posts.data.images
            this.props.setUserPosts(posts.reverse())
        } catch {
            console.log('oops')
        }
    }

    handleDeleteClick(fileName) {
        if(this.props.isLoggedin){
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
            .then(res => {if(res.data.deleted===true) this.props.deleteUserPost(fileName) })
        } else {
            alert('you aren\'t signed in!')
        }
    }

    render() {
        let PostClassName = classNames('PostItem', this.props.TextColor==='white'?'PostItemDark':'PostItemLight')
        if(this.props.userPosts.length===0) {
            return (
                <div className='EmptyPost' style={{color:this.props.TextColor}}>
                    Upload your own picture<br />
                    using button above!
                </div>
            )
        }

        return(
            this.props.userPosts.map(item => {
                let itemName=`/api/getUserImage/${this.props.URLUserName}/${item._id}`
                return (
                    <div key={item._id} className={PostClassName}>
                        <div style={{color:this.props.TextColor}} className='Item Flexible'>
                            <h1>{item.name}</h1>
                        </div>
                        <Picture itemName={itemName} />
                        <Buttons
                            itemFolder={itemName}
                            item={item}
                            handleDeleteClick={this.handleDeleteClick.bind(this)}
                        />
                    </div>
                )
            })
        )
    }
}

const mapStateToProps = store => {
    return {
        isLoggedin: store.isLoggedin,
        userName: store.userName,
        userPosts: store.userPosts,
        JWTToken: store.userJWTToken,
        TextColor: store.theme==='dark'?'white':'black'
    }
}

const mapActionsToProps = dispatch => {
    return {
        deleteUserPost: bindActionCreators(deleteUserPost, dispatch),
        setUserPosts: bindActionCreators(setUserPosts, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(PostItems)
