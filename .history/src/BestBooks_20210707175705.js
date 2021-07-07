import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
class MyFavoriteBooks extends React.Component {
  constructor(props){
    super(props);
    this.state={
      listOfBook:[],
      name:''
    }
  }

  componentDidMount = async() => {
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

    let email=this.props.auth0.user.email
    const url=`http://localhost:8080/books?email=${email}`;
    axios.get(url).then(response =>{
      console.log(response.data);
      this.setState({
        listOfBook:response.data
      })
    })
  }
  inputBook =(e)=>{
    this.setState({
      name:e.target.value
    })
  }
  addBook = (e)=>{
    e.preventDefault()
    const reqBody = {
      name:this.state.name,
      userEmail:this.props.auth0.user.email
    }
    console.log('this.userEmail',reqBody.userEmail);
    console.log('auth',this.props.auth0.user.email);
    const url=`http://localhost:8080/books`
    axios.post(url,reqBody).then(response =>{
      console.log('data',response.data);
      this.setState({
        listOfBook:response.data
      })
    })
  }
  render() {
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        <form>
          <input type='text' placeholder='add book' onChange={(e)=>{this.inputBook(e)}}/>
          <button onClick={(e)=>{this.addBook(e)}}>add book</button>
        </form>
        <ol>
        {
          this.state.listOfBook.map(book =>{
            return <>
             <li>{book.name},{book.description},{book.status}</li>
            </>
          })
        }
        </ol>
      </Jumbotron>
    )
  }
}
export default withAuth0(MyFavoriteBooks);