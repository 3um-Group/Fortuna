import * as React from "react";
import * as UI from 'react-daisyui';
import clsx from "clsx";
  
import type { LoaderFunctionArgs } from "react-router-dom";
import {
  Form,
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  redirect,
  Navigate,
  useActionData,
  useFetcher,
  useLocation,
  useNavigation,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";

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

export type ErrorViewProps = {
  msg?: string
}

export const ErrorView = <HTMLDivElement, ErrorViewProps>({...props}): React.JSX.Element => {
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

export interface AuthContextType {
  user: any;
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function useAuth() {
  return React.useContext(AuthContext);
}


const AuthStatus = (): React.JSX.Element => {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
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


function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username") as string;

    auth.signin(username, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    });
  }

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{" "}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

function protectedLoader({ request }: LoaderFunctionArgs) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication

  const fakeAuthProvider = {
    isAuthenticated: false
  }

  if (!fakeAuthProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }

  return null;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

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
          element: (<>
          <UI.Loading/>
          </>)
        },
        {
          path: "protected",
          loader: protectedLoader,
          Component: ProtectedPage
        }
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
      element: (<LoginPage/>),
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