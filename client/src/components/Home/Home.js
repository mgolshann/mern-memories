import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

// material stuff
import { Grow, Grid, Container, Paper, AppBar, TextField, Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input'

// redux 
import { useDispatch } from 'react-redux'

// redux actions
import { getPosts, getPostBySearch } from '../../actions/posts'

// Styles
import useStyle from './styles'

// Components
import Posts from '../../components/Posts/Posts'
import Form from '../../components/Form/Form'
import Paginate from '../Pagination'

// we're going to use that to know on which page we currently on 
// and what search term are we looking for
function useQuery() {
    // that simply allow us to use it as a Hook 
    return new URLSearchParams(useLocation().search)
}


function Home() {
    const query = useQuery();
    const classes = useStyle();
    const history = useHistory();
    const dispatch = useDispatch();

    const [tags, setTags] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPostId, setCurrentPostId] = useState(null);

    // check URL to see if page parameter is there or not. if so it's going to populate the variable
    const page = query.get('page') || 1; // if we don't have the page we must be on the first page
    const serachQuery = query.get('searchQuery')

    {/*
        we no longer use useEffect and we should pass our page number to the pagination 
        and there we use useEffect and pass the page to the dispatcher
        // useEffect for getting the post after component render
        useEffect(() => {
            dispatch(getPosts())
        }, [currentPostId, dispatch])
    */}

    const handleSearchButton = () => {
        if (search.trim() || tags) {
            // get post by search and tags
            // we join tags by comma to pass the data through the url to backend
            dispatch(getPostBySearch({ search, tags: tags.join(',') }))

            // we need client-side routing because with that we simply 
            // access to searchQyery and tags in the frontend side
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        } else {
            history.push('/')
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) { // when user press Enter
            // go to search function
            handleSearchButton()
        }
    }

    // Add tag to the Tags State
    const handleTagsAdd = (tag) => setTags([...tags, tag])
    // Delete tag from the Tags State
    const handleTagsDelete = (tag) => setTags(tags.filter(item => item !== tag))

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>

                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentPostId={setCurrentPostId} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            {/* Text Field For Search Item */}
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search Memories"
                                fullWidth
                                value={search}
                                onKeyPress={handleKeyPress}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {/* Text Field For Tags */}
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                label="Search Tags"
                                variant="outlined"
                                value={tags}
                                onAdd={handleTagsAdd}
                                onDelete={handleTagsDelete}
                            />
                            {/* Button to submit the search and tag form */}
                            <Button
                                variant="contained"
                                className={classes.searchButton}
                                onClick={handleSearchButton}
                                color="primary"
                            >Search</Button>
                        </AppBar>

                        {/* From to Create or Edit Post */}
                        <Form currentPostId={currentPostId} setCurrentPostId={setCurrentPostId} />

                        {/* Pagination Section */}
                        {(!serachQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Paginate page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow >
    )
}

export default Home
