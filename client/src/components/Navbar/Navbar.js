import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as type from '../../type'

// dispatch

// matrial stuff
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core'

// import images
import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';

// import styles 
import useStyle from './styles'

const Navbar = () => {

    const classes = useStyle();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))

    const logout = () => {
        dispatch({ type: type.LOGOUT })
        history.push('/')
        setUser(null)
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("profile")))
    }, [location])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">

            <Link to="/" className={classes.brandContainer}>
                <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" />
                <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
            </Link>

            <Toolbar className={classes.toolbar}>
                {user?.result ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} onClick={logout} color="secondary">Logout</Button>
                    </div>
                ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
                    )}
            </Toolbar>

        </AppBar>
    )
}

export default Navbar