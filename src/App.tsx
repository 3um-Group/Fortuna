import * as React from "react";
import * as UI from 'react-daisyui';
  
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";

import {usePageTracking} from './middleware/usePageTracking';

import { 
  LoginPage, 
  Layout, 
  ErrorView,
  protectedLoader,
  ProtectedPage, 
  RequireAuth } from './components/AppView';

import { Client, Provider } from "urql";

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


const App = (): React.JSX.Element => {
  usePageTracking();

  const router = createBrowserRouter([
    {
      id: "root",
      path: "/",
      Component: Layout,
      errorElement: (<ErrorView/>),
      children: [
        {
          path: "main",
          errorElement: (<ErrorView/>),
          element: (
            <Provider value={Client}>
              <UI.Loading/>
            </Provider>
          )
        },
        {
          path: "protected",
          loader: protectedLoader,
          Component: ProtectedPage
        },
        {
          path: "dashboard",
          errorElement: (<ErrorView/>),
          element: (
            <RequireAuth>
              <><h2>Protected page</h2></>
            </RequireAuth>
          )
        }
      ],
    }, {
      path: "/login",
      Component: LoginPage,
      errorElement: (<ErrorView/>),
    }, {
      path: "/logout",
      async action() {
        // We signout in a "resource route" that we can hit from a fetcher.Form
        //await fakeAuthProvider.signout();
        return redirect("/");
      }  
    },
  ]);

  return (<RouterProvider router={router} />);
}

export default App;