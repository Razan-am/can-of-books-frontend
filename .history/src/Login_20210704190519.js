import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import './Login.css';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Card style={{ width: '18rem' }}>
         <Card.Body>
          <Card.Title>Log In</Card.Title>
           <Card.Text>
             Click Below to Log In
           </Card.Text>
           <button onClick={() => loginWithRedirect()}>Log In</button>
           {/* TODO: add a `LoginButton` component here that will log the user in with Auth0 */}
         </Card.Body>
       </Card>
  )  
};

export default Login;
