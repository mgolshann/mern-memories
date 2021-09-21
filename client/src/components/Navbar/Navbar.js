import React, { useState } from 'react'
import { Link } from 'react-router-dom';

// matrial stuff
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core'

// import images
import memories from '../../images/memories.png'

// import styles 
import useStyle from './styles'

function Navbar() {
    const classes = useStyle();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))

    
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">

            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />
            </div>

            <Toolbar className={classes.toolbar}>
                {user?.result ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                        <Button variant="container" className={classes.logout} color="secondary">Logout</Button>
                    </div>
                ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
                    )}
            </Toolbar>

        </AppBar>
    )
}

export default Navbar