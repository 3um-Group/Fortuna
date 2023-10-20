import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as DaisyUI from 'react-daisyui';
import clsx from "clsx";


import {usePageTracking} from './middleware/usePageTracking';

//import ReactGA from "react-ga4";

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

function Layout({...args}): React.JSX.Element {
  const [visible, setVisible] = React.useState(false);
  const toggleVisible = React.useCallback(() => {
    setVisible(visible => !visible);
  }, []);
  return (
  <DaisyUI.Drawer {...args} 
    open={visible} 
    onClickOverlay={toggleVisible} 
    side={<DaisyUI.Menu className={clsx([
        "p-4", "w-80", "h-full", "bg-base-200", "text-base-content"])}>
          <DaisyUI.Menu.Item>
            <a>Sidebar Item 1</a>
          </DaisyUI.Menu.Item>
          <DaisyUI.Menu.Item>
            <a>Sidebar Item 2</a>
          </DaisyUI.Menu.Item>
        </DaisyUI.Menu>}>
      <DaisyUI.Button color="primary" onClick={toggleVisible}>
        Open drawer
      </DaisyUI.Button>
    </DaisyUI.Drawer>
  );
}

const App = (): React.JSX.Element => {
  usePageTracking();

  const router = createBrowserRouter([
    {
      element: (
        <Layout />
      ),
      errorElement: (
        <div>
          <h1> Error loading route...</h1>
        </div>
      ),
    },
    {
      path: "/",
      element: (
       <><p>Loading main view</p></>
      ),
    },
  ]);

  return (<RouterProvider router={router} />);
}

export default App;