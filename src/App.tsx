import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "urql";

/*
import NewsClient from "./api/NewsApiClient";
import NewsApiView from "./components/NewsApiView/NewsApiView";
const NewsApi:Client = NewsClient({
  region: 'us-east-1-shared-usea1-02', 
  version: 2,
  key: 'cllcilper2zc701tc3wu0652t',
  environment: 'master'
});
*/

type routeItem = {
  path: string,
  errorElement: JSX.Element,
  element: JSX.Element,
}

function routeFactory(path:string, errorElement: JSX.Element, element:JSX.Element): routeItem {
  return {path, errorElement, element}
}

/*
    routeFactory("/NewsView",
(<div><h1>Error loading route...</h1></div>),
(<Provider value={NewsApi}><NewsApiView /></Provider>)),
*/

function App(): JSX.Element {
  const router = createBrowserRouter([
    routeFactory("/",
          (<div><h1>Error loading route...</h1></div>),
          (<><p>Loading main view</p></>))
  ]);
  return <RouterProvider router={router} />;
}

export default App;
