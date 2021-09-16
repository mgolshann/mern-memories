import React from 'react'
import { Grid, Card } from '@material-ui/core'
import Post from './Post/Post'

// redux
import { useSelector } from 'react-redux'

// import styles
import useStyle from './styles'

const Posts = ({ setCurrentPostId }) => {
    const posts = useSelector((state) => state.posts);
    const classes = useStyle();

    return (
        !posts.length ? (
            <Card>
                <p>there is no post </p>
            </Card>
            ) : (
            <Grid container className={classes.container} alignItems="stretch" spacing={3}>
                {posts.map(post => (
                    <Grid item key={post._id} xs={12} sm={6}>
                        <Post setCurrentPostId={setCurrentPostId} post={post} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts;
