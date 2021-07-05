import React, { Component } from 'react'


export class Profile extends Component {
    render() {
        return (
            <div>
                <h1>Hello, welcome to our librery books</h1>
                {
                    this.props.auth0.isAuthenticated&&
                    <>
                    <h1>{this.props.auth0.user.name}</h1>
                    <img src={this.props.auth0.user.picture} alt={this.props.auth0.user.name}/>
                    <h1>{this.props.auth0.user.name}</h1>
                    </>

                }
                
            </div>
        )
    }
}

export default Profile
