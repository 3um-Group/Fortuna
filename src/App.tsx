import * as React from "react";
import * as UI from 'react-daisyui';
import clsx from 'clsx';

import { useAuth0 } from '@auth0/auth0-react';
import { Client, Provider } from "urql";
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

import { Routes, Route } from 'react-router-dom';


import {usePageTracking} from './middleware/usePageTracking';

import {
  LoginPage,
  Layout,
  ErrorView,
  protectedLoader,
  ProtectedPage,
  RequireAuth
} from './components/AppView';

import {
  LogoutButton,
  SignupButton,
  LoginButton
} from './components/AuthElement';

/*
import NewsClient from "./api/NewsApiClient";
import NewsApiView from "./components/NewsApiView/NewsApiView";
const NewsApi:Client = NewsClient({
  region: 'us-east-1-shared-usea1-02',
  version: 2,
  key: 'cllcilper2zc701tc3wu0652t',
  environment: 'master'
});
    {
    path: "/NewsView",
    errorElement: (
      <div>
        <h1> Error loading route...</h1>
      </div>
    ),
    element: (<Provider value={NewsApi}><NewsApiView/></Provider>)},
*/

const OauthCallback = (): React.JSX.Element => {
    return (<div className="page-layout"></div>);
}

const AuthButtons = (): React.JSX.Element => {
  const {isAuthenticated} = useAuth0();

  return (
    <UI.Card>
      <UI.Card.Body className={clsx('items-center', 'text-center')}>
        <UI.Card.Title>Authentication Required</UI.Card.Title>
          <UI.Card.Actions className="justify-end">
          {(!isAuthenticated) ? (
                <>
                  <SignupButton/>
                  <LoginButton/>
                </>
            ) : (
                <LogoutButton/>
            )}
      </UI.Card.Actions>
      </UI.Card.Body>
    </UI.Card>
  );
}

const App = (): React.JSX.Element => {
  usePageTracking();

  LogRocket.init('kmfzyf/secret-squirrel');
  setupLogRocketReact(LogRocket);

  /*
  LogRocket.identify('THE_USER_ID_IN_YOUR_LOGROCKET_APP', {
    name: Auth0.user.name,
    email: Auth0.user.email,
    subscriptionType: Auth0.user.roles[0]
  });
  */

  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<ErrorView />} /> {/* Handle logout logic elsewhere */}
        <Route path="/callback" element={<OauthCallback />} />
        <Route path="/protected" element={
          <RequireAuth>
            <ProtectedPage />
          </RequireAuth>
        } />
        <Route path="/dashboard" element={
          <RequireAuth>
            <h2>Protected page</h2>
          </RequireAuth>
        } />
        <Route path="/" element={
          <Provider value={Client}>
            <Loading />
            <AuthButtons />
          </Provider>
        } />
        <Route path="*" element={<ErrorView />} />
      </Routes>
    </Layout>
  );
};

export default App;
