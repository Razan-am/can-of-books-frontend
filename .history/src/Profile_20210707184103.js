import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';


class Profile extends Component {
    componentDidMount = async() => {
        if (this.props.auth0.isAuthenticated) {
            this.props.auth0.getIdTokenClaims()
                .then(async(res) => {
                    const jwt = await res.__raw;
                    const config = {
                        headers: { "Authorization": `Bearer ${jwt}`,"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": true, 'Content-Type': 'application/json', 'mode': 'no-cors' },
                        method: 'get',
                        baseURL: 'http://localhost:8000',
                        url: '/authorize'
                    }
                    axios(config)
                        .then(axiosResults => console.log(axiosResults.data))
                        .catch(err => console.error(err));
                })
                .catch(err => console.error(err));
        }
    }
    render() {
        return (
            <div>
                <h1>Hello, welcome to our librery books</h1>
                {
                    this.props.auth0.isAuthenticated &&
                    <>
                        <h1>{this.props.auth0.user.name}</h1>
                        <img src={this.props.auth0.user.picture} alt={this.props.auth0.user.name} />
                        <h1>{this.props.auth0.user.email}</h1>
                    </>

                }

            </div>
        )
    }
}

export default withAuth0(Profile);