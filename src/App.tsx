import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Client, Provider } from "urql";

import NewsClient from "./api/NewsApiClient";
import NewsApiView from "./components/NewsApiView/NewsApiView";

const NewsApi:Client = NewsClient({
  region: 'us-east-1-shared-usea1-02', 
  version: 2,
  key: 'cllcilper2zc701tc3wu0652t',
  environment: 'master'
});

function App(): JSX.Element {
  const router = createBrowserRouter([
    {
    path: "/NewsView",
    errorElement: (
      <div>
        <h1> Error loading route...</h1>
      </div>
    ),
    element: (<Provider value={NewsApi}><NewsApiView/></Provider>
    )
    }, {
      path: "/",
      errorElement: (
        <div>
          <h1> Error loading route...</h1>
        </div>
      ),
      element: (
       <><p>Loading main view</p></>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
