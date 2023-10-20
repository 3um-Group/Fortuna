import * as React from 'react';
/*import {
  Form,
  Link,
  Outlet,
  redirect,
  Navigate,
  useActionData,
  useFetcher,
  useLocation,
  useNavigation,
  useNavigate,
  useRouteLoaderData,
  LoaderFunctionArgs
} from "react-router-dom";*/

import {
  Link,
  Outlet,
  redirect,
  Navigate,
  useLocation,
  useNavigate,
  LoaderFunctionArgs
} from "react-router-dom";

import clsx from "clsx";
import * as UI from 'react-daisyui';
import { twMerge } from 'tailwind-merge';


export interface AuthContextType {
    user: any;
    signin: (user: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
};

export const AuthContext = React.createContext<AuthContextType>(null!);
export const useAuth = () => React.useContext(AuthContext);


export const AuthStatus = (): React.JSX.Element => {
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
  
export const RequireAuth = ({ children }: { children: React.JSX.Element }) => {
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
  
  export const protectedLoader = ({ request }: LoaderFunctionArgs): any => {
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
  
export const ProtectedPage = (): React.JSX.Element => {
    return <h3>Protected</h3>;
};

export const LoginPage = (): React.JSX.Element => {
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
};

export const ErrorView = ({...props}): React.JSX.Element => {
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
      </UI.Card>
    );
};

export const Layout = ({...props}): React.JSX.Element => {
    const {className} = props;
    const [visible, setVisible] = React.useState(false);

    const toggleVisible = React.useCallback(() => {
      setVisible(visible => !visible);
    }, []);

    return (<>
        <UI.Drawer 
        open={visible} 
        onClickOverlay={toggleVisible} 
        side={<UI.Menu className={twMerge(
            className,
            clsx([
                "p-4", 
                "w-80", 
                "h-full", 
                "bg-base-200", 
                "text-base-content"]))}>
                <UI.Menu.Item>
                    <Link to="/">Home</Link>
                </UI.Menu.Item>
                <UI.Menu.Item>
                    <Link to="/logout">Log out</Link>
                </UI.Menu.Item>
            </UI.Menu>}>
            <UI.Button color="primary" onClick={toggleVisible}>
            Open drawer
            </UI.Button>
        </UI.Drawer>
        <Outlet/>
    </>);
};

export default Layout;