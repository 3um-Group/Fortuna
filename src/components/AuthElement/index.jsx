import React from 'react';
import * as UI from 'react-daisyui';
import { useAuth0 } from "@auth0/auth0-react";

// Basic Login button for auth0
export const LoginButton = (): React.JSX.Element => {
  // const {isAuthorized, user} = useAuth0();

  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
    });
  };

  return (
    <UI.Theme dataTheme="dark">
      <UI.Button onClick={handleLogin}>Login</UI.Button>
    </UI.Theme>
  );
}

// Basic Logout button for auth0
export const LogoutButton = (): React.JSX.Element => {
    // const {isAuthorized, user} = useAuth0();

  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

    return (
        <UI.Theme dataTheme="dark">
            <UI.Button onClick={handleLogout}>Logout</UI.Button>
        </UI.Theme>
    );
}

export const SignupButton = (): React.JSX.Element => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <UI.Theme dataTheme="dark">
        <UI.Button onClick={handleSignUp}>Logout</UI.Button>
    </UI.Theme>
  );
};
