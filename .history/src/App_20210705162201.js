import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { withAuth0 } from '@auth0/auth0-react';
import BestBooks from './BestBooks'
import Login from './Login';
import BrowserRouter from './BrowserRouter';
import Profile from './Profile'
class App extends React.Component {

  render() {
    const user = this.props.user
    console.log('app', this.props);
    return (
      <>
        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
              <Route exact path="/">
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
                {
                  this.props.auth0.isAuthenticated ?
                    <BestBooks />
                    :<Login/>
                }
              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
              <Route exact path='/profile'>{
              this.props.auth0.isAuthenticated ?
                    <Profile userInfo={user}/>:''}
                </Route>
              <BrowserRouter/>
            </Switch>
            <Footer />
          </IsLoadingAndError>
          {/* <Profile/> */}
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
