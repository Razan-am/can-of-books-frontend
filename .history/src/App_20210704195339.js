import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import BestBooks from './BestBooks'
import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import BrowserRouter from './BrowserRouter';
import Profile from './Profile'


// import Profile from './Profile';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class App extends React.Component {

  render() {
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
                    :<Route to='/login'>
                       <LoginButton/>
                     </Route>
                }
              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
              <Route exact path='/profile'>
                    <Profile/>
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
