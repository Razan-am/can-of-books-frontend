import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Card,Button } from 'react-bootstrap';

class BookFormModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfBook: [],
            name: '',
            description: '',
            status: '',
            newNameBook: '',
            newDescriptionBook: '',
            newStatusBook: '',
            url: '',
            book_idx: ''

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
        const url = `http://localhost:8080/books?email=${email}`;
        axios.get(url).then(response => {
            console.log('previous data', response.data);
            this.setState({
                listOfBook: response.data
            })
        })
    }




    insetName = (e) => {
        (e).preventDefault();
        this.setState({
            newNameBook: e.target.value,


        })
        // console.log('insetName', e.target.value)
    }
    insertDescription = (e) => {
        (e).preventDefault();
        this.setState({
            newDescriptionBook: e.target.value,
        })
        //  console.log('insertDescription',e.target.value)
    }
    insertStatus = (e) => {
        (e).preventDefault();
        this.setState({
            newStatusBook: e.target.value,
        })
        // console.log('insertStatus',e.target.value)



    }
    // deleteOne=(e)=>{
    //     e.preventDefault()
    //     this.setState({
    //         youCanDelete:e.target.value,



    //     })
    // }








    // createBook = (e) => {
    //     this.setState({
    //         name: this.state.newNameBook,
    //         description: this.state.newDescriptionBook,
    //         status: this.state.newStatusBook,
    //     })
    // }
    addBook = (e) => {
        e.preventDefault()
        try {

            const reqBody = {
                name: this.state.newNameBook,
                description: this.state.newDescriptionBook,
                status: this.state.newStatusBook,
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
        } catch {
            console.log('error');
        }
    }


    deleteBook = (book_idx) => {

        axios.delete(`http://localhost:8080/books/${book_idx}/?email=${this.props.auth0.user.email}`).then(res => {
            this.setState({
                listBook: res.data
            })
        })
    }



    // deleteBook =  (book_idx => {

    //     try{
    //     let email = (this.props.auth0.user.email)
    //     const url =  (`http://localhost:8080/books/${book_idx}/?email=${email}`)

    //     .then(axios.delete(url).catch(res => {
    //         // this.setState({
    //         //     listOfBook:res.data
    //         // })
    //         // console.log('delete');
    //     }))
    //   }catch{
    //     console.log('what happend??!')

    //   }
    // })

    // nowDeleteBook=async(book_idx)=>{
    //     try{
    //         e.preventDefault()
    //         let email = this.props.auth0.user.email,
    //         // let urlForDelete = `http://localhost:8080/books/${book_idx}/?email=${email}`,

    //     //    let deleteThe =await axios.delete(`http://localhost:8080/books/${book_idx}/?email=${email}`),
    //        let weatherGet = await axios.get(weatherUrl).then(response => {

    //         this.setState({
    //             weather: response.data,
    //             show: true})
    //     }
    //     catch {
    //         // this.setState({
    //         //     error: 'can not deleted bz the status is active '
    //         // });
    //         console.log('what happend')

    //     }




    // }



    //   deleteOne=(book_idx)=>{
    //     // e.preventDefault();

    //     // this.setState({
    //     //     youCanDelete:e.target.value,



    //     // })
    //     let email = this.props.auth0.user.email;
    //     const url = `http://localhost:8000/books/${book_idx}/?email=${email}`;

    //     axios.delete(url).then(res => {
    //         // this.setState({
    //         //     listOfBook:res.data
    //         // })
    //         // console.log('delete');
    //     })
    // }

    // deleteBook = (book_idx => {
    //     let email = this.props.auth0.user.email;
    //     const url = `http://localhost:8000/books/${book_idx}/?email=${email}`;

    //     axios.delete(url).then(res => {
    //         // this.setState({
    //         //     listOfBook:res.data
    //         // })
    //         // console.log('delete');
    //     })
    // })


    // deleteBook = (book_idx => {
    //     let email = this.props.auth0.user.email
    //     const url = `http://localhost:8000/books/${book_idx}/?email=${email}`

    //     axios.delete(url).then(res => {
    //         // this.setState({
    //         //     listOfBook:res.data
    //         // })
    //         // console.log('delete');
    //     })
    // })



    // deleteBook = (book_idx => {
    //     let email = this.props.auth0.user.email
    //     const url = `http://localhost:8000/books/${book_idx}/?email=${email}`

    //     axios.delete(url).then(res => {
    //         // this.setState({
    //         //     listOfBook:res.data
    //         // })
    //         // console.log('delete');
    //     })
    // })




    render() {
        return (
            <>

                <form>
                    <input type='text' placeholder='add book' onChange={(e) => { this.insetName(e) }} />
                    {/* <button onClick={(e) => { this.createBook(e) }}>Insert</button> */}
                    <input type='text' placeholder='add description' onChange={(e) => { this.insertDescription(e) }} />
                    {/* <button onClick={(e) => { this.createBook(e) }}>Inser</button> */}
                    <input type='text' placeholder='add status' onChange={(e) => { this.insertStatus(e) }} />
                    {/* <button onClick={(e) => { this.createBook(e) }}>Insert</button> */}
                    <br />
                    <br />
                    <button onClick={(e) => { this.addBook(e) }}>add book</button>
                    <br />
                    <br />
                    <br />
                    <br />
                </form>
                <ol>
                    {
                        this.state.listOfBook.map((book, index) => {
                            return <>
                                <Card bg='info'>
                                    <Card.Header as="h5">Book Name: {book.name}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>Description: {book.description}</Card.Title>
                                        <Card.Text>
                                        Status: {book.status}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Button variant="danger" onClick={() => this.deleteBook(index)}>Delete Book</Button>
                                {/* <button onClick={() => this.deleteBook(index)}></button> */}
                            </>
                        })
                    }
                </ol>
            </>
        )
    }
}

export default withAuth0(BookFormModal);
