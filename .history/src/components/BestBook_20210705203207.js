import React, { Component } from 'react';
import axios from 'axios';


class BestBook extends Component {
    componentDidMount = () => {
        if (this.props.auth0.isAuthenticated) {
            this.props.auth0.getIdTokenClaims()
                .then(res => {
                    const jwt = res.__raw;
                    const config = {
                        headers: { "Authorization": `Bearer ${jwt}` },
                        method: 'get',
                        baseURL: process.env.REACT_LOCAL_HOST,
                        url: '/books'
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
            <>
                
            </>
        )
    }
}

export default BestBook;
