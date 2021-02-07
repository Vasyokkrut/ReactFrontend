import React from 'react'
import axios from 'axios'
import Picture from '../../Picture'
import Buttons from '../../buttons/functionalButtons'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deletePost, deleteUserPost, setPosts } from '../../../Store/actions.js'

class PublicPostItems extends React.Component {

    async componentDidMount() {
        let publicPosts = await axios.get('/api/getImages')
        publicPosts = publicPosts.data.images
        this.props.setPosts(publicPosts.reverse())
    }

    render() {
        let PostClassName = classNames('PostItem', this.props.TextColor==='white'?'PostItemDark':'PostItemLight')

        if(this.props.publicPosts.length===0) {
            return (
                <div className='EmptyPost' style={{color:this.props.TextColor}}>
                    Upload your own picture<br />
                    using button above!
                </div>
            )
        }

        return(
            this.props.publicPosts.map(item => {
                let itemName=`/api/getImage/${item._id}`
                return (
                    <div key={item._id} className={PostClassName}>
                        <div style={{color:this.props.TextColor}} className='Item Flexible'>
                            <h1>{item.name}</h1>
                        </div>
                        <Picture itemName={itemName} />
                        <Buttons
                            itemFolder={itemName}
                            item={item}
                            handleDeleteClick={() => {alert('you cannot delete public posts')}}
                        />
                    </div>
                )
            })
        )
    }
}

const mapStateToProps = store => {
    return {
        publicPosts: store.posts,
        TextColor: store.theme==='dark'?'white':'black'
    }
}

const mapActionsToProps = dispatch => {
    return {
        setPosts: bindActionCreators(setPosts, dispatch),
        deletePost: bindActionCreators(deletePost, dispatch),
        deleteUserPost: bindActionCreators(deleteUserPost, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(PublicPostItems)
