import * as React from "react";
import { createBrowserRouter, RouterProvider, Outlet, Navigate, useLocation } from "react-router-dom";
import * as UI from 'react-daisyui';

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
  return (<>
  <UI.Drawer {...args} 
    open={visible} 
    onClickOverlay={toggleVisible} 
    side={<UI.Menu className={clsx([
        "p-4", "w-80", "h-full", "bg-base-200", "text-base-content"])}>
          <UI.Menu.Item>
            <a>Sidebar Item 1</a>
          </UI.Menu.Item>
          <UI.Menu.Item>
            <a>Sidebar Item 2</a>
          </UI.Menu.Item>
        </UI.Menu>}>
      <UI.Button color="primary" onClick={toggleVisible}>
        Open drawer
      </UI.Button>
    </UI.Drawer>
    <Outlet/>
    </>
  );
}

type ErrorViewProps = {
  msg?: string
}

const ErrorView = <HTMLDivElement, ErrorViewProps>({...props}): React.JSX.Element => {
  const {msg} = props;

  return (
   <UI.Card>
   <UI.Card.Body>
     <UI.Card.Title tag="h2">Error Loading route...</UI.Card.Title>
     <p>{msg}</p>
     <UI.Card.Actions className="justify-end">
       <UI.Button color="primary"><Navigate to={"/"}/></UI.Button>
     </UI.Card.Actions>
   </UI.Card.Body>
 </UI.Card>);
}


interface AuthContextType {
  user: any;
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function useAuth() {
  return React.useContext(AuthContext);
}

const RequireAuth = ({ children }: { children: React.JSX.Element }) => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

const App = (): React.JSX.Element => {
  usePageTracking();

  const router = createBrowserRouter([
    {
      path: "/",
      element: (<Layout />),
      errorElement: (<ErrorView/>),
      children: [
        {
          path: "main",
          errorElement: (<ErrorView/>),
          element: (<>
          <UI.Loading/>
          </>)
        },
      ]
    },
  ]);

  return (<RouterProvider router={router} />);
}

export default App;