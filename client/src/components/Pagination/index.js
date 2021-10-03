import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

// redux
import { useDispatch, useSelector } from 'react-redux'

// dispatchers
import { getPosts } from '../../actions/posts'

// material stuff
import { Pagination, PaginationItem } from '@material-ui/lab'

// styles
import useStyles from './styles'

const Paginate = ({ page }) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const { numberOfPage } = useSelector(state => state.posts)

    useEffect(() => {
        if (page) dispatch(getPosts(page))
    }, [page])

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPage} // number of pages
            page={Number(page) || 1}  // Current page    
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    )
}

export default Paginate