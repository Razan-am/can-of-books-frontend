import React, { Component } from 'react'
import { withAuth0 } from '@auth0/auth0-react';
// import { Router } from 'react-router-dom';

import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

class BrowserRouter extends Component {
    render() {
        return (
            <>
            <Router>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
            </Router>
            </>
        )
    }
}

export default withAuth0(BrowserRouter);
