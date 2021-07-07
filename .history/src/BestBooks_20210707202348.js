import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import BookFormModal from './BookFormModal';
class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        <BookFormModal />
      </Jumbotron>
    )
  }
}
export default withAuth0(MyFavoriteBooks);