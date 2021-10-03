import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core'
import Post from './Post/Post'

// redux
import { useSelector } from 'react-redux'

// import styles
import useStyle from './styles'

const Posts = ({ setCurrentPostId }) => {
    const classes = useStyle();
    const { isLoading, posts } = useSelector((state) => state.posts);

    if (!posts.length && !isLoading) return "No posts" 

    return (
        isLoading ? <CircularProgress /> : (
            <Grid container className={classes.container} alignItems="stretch" spacing={3}>
                {posts.map(post => (
                    <Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
                        <Post setCurrentPostId={setCurrentPostId} post={post} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts;
