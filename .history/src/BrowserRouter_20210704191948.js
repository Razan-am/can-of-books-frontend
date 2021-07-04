import React, { Component } from 'react'
import { withAuth0 } from '@auth0/auth0-react';
// import { Router } from 'react-router-dom';
import BestBooks from './BestBooks'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class BrowserRouter extends Component {
    render() {
        return (
            <>
            <Router>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
            </Router>
            <Switch>
                <Route exact path='/'>
                {
                  this.props.auth0.isAuthenticated ?
                    <BestBooks />
                    : <Login />
                }
                </Route>
            </Switch>
            </>
        )
    }
}

export default withAuth0(BrowserRouter);
