import React, { Component } from 'react'
import { Router } from 'react-router-dom';

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

export default BrowserRouter;
