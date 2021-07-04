import React, { Component } from 'react'

class BrowserRouter extends Component {
    render() {
        return (
            <div>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
            </div>
        )
    }
}

export default BrowserRouter;
