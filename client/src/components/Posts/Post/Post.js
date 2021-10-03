import React from 'react'

// import third party libraries
import moment from 'moment'

// import materials
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'

// import icons
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltOutlined from '@material-ui/icons/ThumbDownAltOutlined';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';

// import styles
import useStyle from './styles'

// import Redux
import { useDispatch } from 'react-redux'

// import actions
import { deletePost, likePost, disLikePost } from '../../../actions/posts'

const Post = ({ post, setCurrentPostId }) => {
    const classes = useStyle();
    const dispatch = useDispatch();

    // get user data from local storage
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if (post?.likes?.length > 0) {
            const index = post?.likes?.find((like) => like === (user?.result?.googleId || user?.result?._id))
            if (index?.length) {
                return <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length}</>
            }
        }
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post?.likes?.length}</>;
    };


    const Dislikes = () => {
        if (post?.dislikes?.length > 0) {
            const index = post?.dislikes?.find((like) => like === (user?.result?.googleId || user?.result?._id))
            if (index?.length > 0) {
                return <><ThumbDownAltIcon fontSize="small" />&nbsp;{post.dislikes.length}</>
            }
        }
        return <><ThumbDownAltOutlined fontSize="small" />&nbsp;{post?.dislikes?.length}</>;
    };



    return (
        <Card className={classes.card} raised elevation={6}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <div className={classes.overlay2}>
                    <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentPostId(post._id)}>
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </div>
            )}
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map(tag => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" component="p" color="textSecondary" gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div>

                    <Button
                        size="small"
                        color="primary"
                        onClick={() => dispatch(likePost(post._id))}>
                        <Likes />
                    </Button>

                    <Button
                        size="small"
                        color="primary"
                        onClick={() => dispatch(disLikePost(post._id))}>
                        <Dislikes />
                    </Button>


                </div>

                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" />
                    </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default Post;
