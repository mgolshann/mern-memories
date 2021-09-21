import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

// types
import * as type from '../../type'

// dispatch
import { useDispatch } from 'react-redux'

// Google Auth
import { GoogleLogin } from 'react-google-login'

// components & icons
import Input from './Input'
import Icon from './icon'

// material
import { Avatar, Paper, Typography, Container, Grid, Button } from '@material-ui/core'

// icons 
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

// styles
import useStyles from './styles'


function Auth() {
    const classes = useStyles();
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = () => { }
    const handleSubmit = () => { }

    // *************** switch between login mode and sign up mode
    const handleSwitchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false)
    }

    // *************** make the password visible or unvisible
    const handleShowPassword = () => setShowPassword(prevPassword => !prevPassword)

    // *************** google auth functions when it success
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: type.AUTH, data: { result, token } })
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    // *************** google auth fail to open
    const googleFailure = () => {
        console.log("Google Sign In was unsuccessful. Try it again.")
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h5">{isSignup ? 'Sign Up' : 'Sing In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstname" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastname" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" type="email" handleChange={handleChange} />
                        <Input name="password" label="Password" type={showPassword ? "text" : "password"} handleChange={handleChange} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" lable="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button
                        type="submit"
                        className={classes.submit}
                        variant="contained"
                        fullWidth
                        color="primary">
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId="543538743656-vda6tmpmhf90qpojflgss641b1n6norj.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color="primary"
                                variant="contained"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                </form>
                <Grid container justifyContent="center">
                    <Grid item>
                        <Button onClick={handleSwitchMode}>
                            {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default Auth
