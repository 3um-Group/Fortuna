import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import registerServiceWorker from "./registerServiceWorker";

import App from "./App";
import "./index.css";

registerServiceWorker();

type Auth0ProviderWithNavigateProps = {
  children?: React.ReactNode;
};

const Auth0ProviderWithNavigate = (props: Auth0ProviderWithNavigateProps) => {

  const { children } = props
  const navigate = useNavigate();



  const onRedirectCallback = (appStat: any) => {
    navigate(appStat?.returnTo || window.location.pathname)
  };

  if (!(process.env.REACT_APP_AUTH0_DOMAIN && process.env.REACT_APP_AUTH0_CLIENT_ID )) {
    return null
  }

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{ redirectUri: window.location.origin }}
      onRedirectCallback={onRedirectCallback}>
      {children}
    </Auth0Provider>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <App />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);
