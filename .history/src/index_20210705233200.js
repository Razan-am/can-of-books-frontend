import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain='dev-64a0nnhc.us.auth0.com'
    clientId='ySAH2JIItutmNeMAaWn8B5af7THn3fk4'
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);