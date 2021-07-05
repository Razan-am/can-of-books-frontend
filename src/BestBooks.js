import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import axios from 'axios';
// import { withAuth0 } from '@auth0/auth0-react';
import './BestBooks.css';
// import { response } from 'express';

class MyFavoriteBooks extends React.Component { 

  render() {
    return(
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
      </Jumbotron>
    )
  }
}

export default MyFavoriteBooks;
