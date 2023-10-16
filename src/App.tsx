import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactGA from "react-ga4";

//import { Client, Provider } from "urql";

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

/*
type routeItem = {
  path: string,
  errorElement: JSX.Element,
  element: JSX.Element,
}

function routeFactory(path:string, errorElement: JSX.Element, element:JSX.Element): routeItem {
  return {path, errorElement, element}
}

    routeFactory("/NewsView",
(<div><h1>Error loading route...</h1></div>),
(<Provider value={NewsApi}><NewsApiView /></Provider>)),


const routeFactory = (props) => ({
  path: `/${props.slug}` || "/",
  key: props.slug || "ROOT",
  component: props.component,
  isRestricted: props.restricted || false,
  isExact: props.exact || true,
  childProps: props.childProps || {}
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

function App(): React.JSX.Element {
  ReactGA.initialize("GA-1231243");
  const router = createBrowserRouter([
    {
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
  return (<>
          <ReactGA.initialize />
          <RouterProvider router={router} />;
  </>);
}

export default App;