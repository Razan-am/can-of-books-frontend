import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Card } from 'react-bootstrap';


class Profile extends Component {

    componentDidMount = async () => {
        console.log('this.props.auth0.isAuthenticated', this.props.auth0.isAuthenticated)
        if (this.props.auth0.isAuthenticated) {
            this.props.auth0.getIdTokenClaims()
                .then(async (res) => {
                    const jwt = await res.__raw;
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${jwt}`, "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Credentials": true,
                            'Content-Type': 'application/json',
                            'mode': 'no-cors'
                        },

                        method: 'get',
                        baseURL: 'http://localhost:8080',
                        url: '/authorize'
                    }
                    axios(config)
                        .then(axiosResults => console.log(axiosResults.data))
                    // .catch(err => console.log('first catch',err));





                })
            // .catch(err =>console.log('seceund catch',err));



        }
    }


    render() {
        return (
            <div>
                <h1 style={{fontFamily:'cursive'}}>Hello, welcome to our librery books</h1>
                {
                    this.props.auth0.isAuthenticated &&
                    <>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={this.props.auth0.user.picture} alt={this.props.auth0.user.name} />
                            <Card.Body>
                                <Card.Title>{this.props.auth0.user.name}</Card.Title>
                                <Card.Text>
                                {this.props.auth0.user.email}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        {/* <h1>{this.props.auth0.user.name}</h1>
                        <img src={this.props.auth0.user.picture} alt={this.props.auth0.user.name} />
                        <h1>{this.props.auth0.user.email}</h1> */}
                    </>

                }

            </div>
        )
    }
}

export default withAuth0(Profile);