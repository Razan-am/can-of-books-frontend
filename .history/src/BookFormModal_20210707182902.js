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
    inputBook = (e) => {
        this.setState({
            name: e.target.value,
            description: e.target.value,
            status: e.target.value
        })
    }

    addBook = (e) => {
        e.preventDefault()
        const reqBody = {
            name: this.state.name,
            description: this.state.description,
            status: this.state.status,
            userEmail: this.props.auth0.user.email
        }
        // console.log('this.userEmail',reqBody.userEmail);
        // console.log('auth',this.props.auth0.user.email);
        const url = `http://localhost:8080/books`
        axios.post(url, reqBody).then(response => {
            console.log('new data', response.data);
            this.setState({
                listOfBook: response.data
            })
        })
    }
    render() {
        return (
            <>
                <form>
                    <input type='text' placeholder='add book' onChange={(e) => { this.inputBook(e) }} />
                    <input type='text' placeholder='add description' onChange={(e) => { this.inputBook(e) }} />
                    <input type='text' placeholder='add status' onChange={(e) => { this.inputBook(e) }} />
                    <button onClick={(e) => { this.addBook(e) }}>add book</button>
                </form>
                <ol>
                    {
                        this.state.listOfBook.map(book => {
                            return <>
                                <li>{book.name},{book.description},{book.status}</li>
                            </>
                        })
                    }
                </ol>
            </>
        )
    }
}

export default withAuth0(BookFormModal);
