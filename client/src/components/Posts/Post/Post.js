import React from 'react'

// import third party libraries
import moment from 'moment'

// import materials
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'

// import icons
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'

// import styles
import useStyle from './styles'

// import Redux
import { useDispatch } from 'react-redux'

// import actions
import { deletePost, likePost, disLikePost } from '../../../actions'

const Post = ({ post, setCurrentPostId }) => {
    const classes = useStyle();
    const dispatch = useDispatch();

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentPostId(post._id)}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map(tag => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="h6" gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => dispatch(likePost(post._id))}>
                        <ThumbUp fontSize="small" style={{ color: post.typeLike === 'like' ? 'red' : 'lightgray' }} />
                        {post.likeCount}
                    </Button>

                    <Button
                        size="small"
                        color="primary"
                        onClick={() => dispatch(disLikePost(post._id))}>
                        <ThumbDown fontSize="small" style={{ color: post.typeLike === 'disLike' ? 'black' : 'lightgray' }} />
                        {post.disLikeCount}
                    </Button>
                </div>
                <Button
                    size="small"
                    color="primary"
                    onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small" />
                        Delete
                </Button>

            </CardActions>
        </Card>
    )
}

export default Post;
