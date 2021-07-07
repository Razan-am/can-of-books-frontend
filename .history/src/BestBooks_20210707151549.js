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
      bookName:''
    }
  }
  componentDidMount = () => {
    if (this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims()
        .then(res => {
          const jwt = res.__raw;
          const config = {
            headers: { "Authorization": `Bearer ${jwt}` },
            method: 'get',
            baseURL: 'http://localhost:8080',
            url: '/authorize'
          }
          axios(config)
            .then(axiosResults => console.log(axiosResults.data))
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    }
  }
  componentDidMount = () => {
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
      bookName:e.target.value
    })
  }
  addBook = (e)=>{
    e.preventDefault()
    const reqBody = this.state.bookName
    let email=this.props.auth0.user.email
    const url=`${process.env.REACT_APP_LOCAL_HOST}/books?email=${email}`
    axios.post(url,reqBody).then(response =>{
      console.log(response.data);
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
          <input type='text' placeholder='add book'/>
          <button>add book</button>
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