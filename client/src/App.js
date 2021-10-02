import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// import material stuff
import { Container } from '@material-ui/core';

// Components
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth'

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/"} render={() => {
                    return <Container maxWidth="lg">
                        <Navbar />
                        <Route path="/" exact component={Home} />
                        <Route path="/auth" exact component={Auth} />
                    </Container>
                }} />
            </Switch>
        </BrowserRouter>
    )
}

export default App;