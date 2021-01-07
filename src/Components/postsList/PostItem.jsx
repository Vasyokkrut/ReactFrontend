import React from 'react'
import axios from 'axios'
import Picture from '../Picture'
import Buttons from '../buttons/functionalButtons'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deletePost, deleteUserPost } from '../../Store/actions.js'

class PostsList extends React.Component {

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
            axios.delete('/api/deleteImage',
                {data:{'delete':fileName}}
            )
            .then(res => {if(res.data.deleted===true) this.props.deletePost(fileName) })
        }
    }

    render() {
        if(this.props.isLoggedin) {
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
                    let itemName=`/api/getUserImage/${this.props.userName}/${item._id}`
                    let PostClassName = classNames('PostItem', this.props.TextColor==='white'?'PostItemDark':'PostItemLight')
                    return (
                        <div key={item._id} className={PostClassName}>
                            <div style={{color:this.props.TextColor}} className='Item Flexible'>
                                <h1>{item.name}</h1>
                            </div>
                            <Picture itemName={itemName} />
                            <Buttons itemFolder={itemName} item={item} handleDeleteClick={this.handleDeleteClick.bind(this)} />
                        </div>
                    )
                })
            )
        }

        if(this.props.posts.length===0) {
            return (
                <div className='EmptyPost' style={{color:this.props.TextColor}}>
                    Upload your own picture<br />
                    using button above!
                </div>
            )
        }

        return(
            this.props.posts.map(item => {
                let itemName=`/api/getImage/${item._id}`
                let PostClassName = classNames('PostItem', this.props.TextColor==='white'?'PostItemDark':'PostItemLight')
                return (
                    <div key={item._id} className={PostClassName}>
                        <div style={{color:this.props.TextColor}} className='Item Flexible'>
                            <h1>{item.name}</h1>
                        </div>
                        <Picture itemName={itemName} />
                        <Buttons itemFolder={itemName} item={item} handleDeleteClick={this.handleDeleteClick.bind(this)} />
                    </div>
                )
            })
        )
    }
}

const mapStateToProps = store => {
    return {
        posts: store.isLoggedin?store.userPosts:store.posts,
        isLoggedin: store.isLoggedin,
        userPosts: store.userPosts,
        userName: store.userName,
        JWTToken: store.userJWTToken
    }
  }

const mapActionsToProps = dispatch => {
    return {
        deletePost: bindActionCreators(deletePost, dispatch),
        deleteUserPost: bindActionCreators(deleteUserPost, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(PostsList)
