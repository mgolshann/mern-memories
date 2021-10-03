import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography } from '@material-ui/core';
import FileBase from 'react-file-base64';

// redux 
import { useDispatch, useSelector } from 'react-redux'

// actions
import { createPost, updatePost } from '../../actions/posts'

// import styles
import useStyle from './styles'

const Form = ({ currentPostId, setCurrentPostId }) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const post = useSelector(state => currentPostId ? state.posts.find(p => p._id === currentPostId) : null)

    const user = JSON.parse(localStorage.getItem("profile"));

    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })

    useEffect(() => {
        if (currentPostId) setPostData(post)
    }, [post, currentPostId])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentPostId) {
            dispatch(updatePost(currentPostId, { ...postData, name: user?.result?.name }))
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }))
        }
        clear();
    }

    const clear = () => {
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        })
        setCurrentPostId(null)
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper} elevation={6}>
                <Typography style={{ fontSize: '15px' }} variant="h6" align="center">
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        );
    }
    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentPostId ? 'Updating' : 'Creating'} a memory</Typography>
                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    multiline
                    rows={3}
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth>Submit</Button>
                <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={clear}
                    fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;
