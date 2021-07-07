import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

class BookFormModal extends Component {
    constructor() {
        super();
        this.state = {
            listOfBook: [],
            name: '',
            description: '',
            status: ''
        }
    }
    componentDidMount = async () => {
        // if (this.props.auth0.isAuthenticated) {
        //   this.props.auth0.getIdTokenClaims()
        //     .then(async(res) => {
        //       const jwt = await res.__raw;
        //       const config = {
        //         headers: { "Authorization": `Bearer ${jwt}`,"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": true, 'Content-Type': 'application/json', 'mode': 'no-cors' },
        //         method: 'get',
        //         baseURL: 'http://localhost:8080',
        //         url: '/authorize'
        //       }
        //       axios(config)
        //         .then(axiosResults => console.log(axiosResults.data))
        //         .catch(err => console.error(err));
        //     })
        //     .catch(err => console.error(err));
        // }

        let email = this.props.auth0.user.email
        const url = `http://localhost:8000/books?email=${email}`;
        axios.get(url).then(response => {
            console.log('previous data', response.data);
            this.setState({
                listOfBook: response.data
            })
        })
    }

    createBook = (e) => {
        this.setState({
            name: e.target.value,
            description: e.target.value,
            status: e.target.value,
        })
    }

    addBook = (e) => {
        e.preventDefault()
        try {

            const reqBody = {
                name: this.state.name,
                description: this.state.description,
                status: this.state.status,
                userEmail: this.props.auth0.user.email
            }
            // console.log('this.userEmail',reqBody.userEmail);
            // console.log('auth',this.props.auth0.user.email);
            const url = `http://localhost:8000/books`
            axios.post(url, reqBody).then(response => {
                console.log('new data', response.data);
                this.setState({
                    listOfBook: response.data
                })
            })
        } catch {
            console.log('error');
        }
    }

    deleteBook = (book_idx => {
        let email = this.props.auth0.user.email
        const url = `http://localhost:8000/books/${book_idx}/?email=${email}`

        axios.delete(url).then(res => {
            // this.setState({
            //     listOfBook:res.data
            // })
            // console.log('delete');
        })
    })
    render() {
        return (
            <>
                <form>
                    <input type='text' placeholder='add book' onChange={(e) => { this.createBook(e) }} />
                    <input type='text' placeholder='add description' onChange={(e) => { this.createBook(e) }} />
                    <input type='text' placeholder='add status' onChange={(e) => { this.createBook(e) }} />
                    <button onClick={(e) => { this.addBook(e) }}>add book</button>
                </form>
                <ol>
                    {
                        this.state.listOfBook.map((book, index) => {
                            return <>
                                <li>{book.name},{book.description},{book.status}</li>
                                <button onClick={() => this.deleteBook(index)}>Delete Book</button>
                            </>
                        })
                    }
                </ol>
            </>
        )
    }
}

export default withAuth0(BookFormModal);
