import React, { useState, useEffect } from 'react'

// material stuff
import { Grow, Grid, Container } from '@material-ui/core';

// redux 
import { useDispatch } from 'react-redux'

// actions
import { getPosts } from '../../actions'

// Styles
import useStyle from './styles'

// Components
import Posts from '../../components/Posts/Posts'
import Form from '../../components/Form/Form'


function Home() {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [currentPostId, setCurrentPostId] = useState(null);

    useEffect(() => {
        dispatch(getPosts())
    }, [currentPostId, dispatch])

    return (
        <Grow in>
            <Container>
                <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch">
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentPostId={setCurrentPostId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentPostId={currentPostId} setCurrentPostId={setCurrentPostId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
