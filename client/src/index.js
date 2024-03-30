import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { ChakraProvider } from "@chakra-ui/react";
import onRedirectCallback from "./util/util.jsx";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-banbcxclca4k625t.us.auth0.com"
      clientId="Xt9uOHkhHClCV77W0w1FgkQky2WRWqB8"
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <BrowserRouter>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
