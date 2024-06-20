import * as React from "react";
import { Theme, Card, Loading} from 'react-daisyui';
import clsx from 'clsx';

import { useAuth0 } from '@auth0/auth0-react';
import { Client, Provider } from "urql";
import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import { usePageTracking } from './middleware/usePageTracking';
import { LoginPage, Layout, ErrorView, protectedLoader, ProtectedPage, RequireAuth } from './components/AppView';
import { LogoutButton, SignupButton, LoginButton } from './components/AuthElement';

const OauthCallback = (): React.JSX.Element => {
  return (<div className="page-layout"></div>);
};

const AuthButtons = (): React.JSX.Element => {
  const { isAuthenticated } = useAuth0();
  return (
    <Card>
      <Card.Body className={clsx('items-center', 'text-center')}>
        <Card.Title>Authentication Required</Card.Title>
        <Card.Actions className="justify-end">
          {!isAuthenticated ? (
            <>
              <SignupButton />
              <LoginButton />
            </>
          ) : (
            <LogoutButton />
          )}
        </Card.Actions>
      </Card.Body>
    </Card>
  );
};

const App = (): React.JSX.Element => {
  usePageTracking();

  const router = createBrowserRouter([
    {
      path: "/login",
      Component: LoginPage,
      errorElement: <ErrorView />,
    },
    {
      path: "/logout",
      async action() {
        return redirect("/");
      },
    },
    {
      path: "/callback",
      Component: OauthCallback,
    },
    {
      id: "root",
      path: "/",
      Component: Layout,
      errorElement: <ErrorView />,
      children: [
        {
          path: "main",
          errorElement: <ErrorView />,
          element: (
            <Provider value={Client}>
              <Loading />
              <AuthButtons />
            </Provider>
          ),
        },
        {
          path: "protected",
          loader: protectedLoader,
          Component: ProtectedPage,
        },
        {
          path: "dashboard",
          errorElement: <ErrorView />,
          element: (
            <RequireAuth>
              <><h2>Protected page</h2></>
            </RequireAuth>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
