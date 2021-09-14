import React, { useEffect } from 'react';
import { Container, Grow, Grid, AppBar, Typography } from '@material-ui/core';

// redux
import { useDispatch } from 'react-redux'

// actions
import { getPosts } from './actions'

// Styles
import useStyle from './styles'

// Components
import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'
import memories from './images/memories.png'

const App = () => {
    const classes = useStyle();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="stretch">
                        <Grid item xs={12} sm={7}>
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;