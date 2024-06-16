import React from 'react';
import * as UI from 'react-daisyui';
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useAuth0 } from "@auth0/auth0-react";

type ButtonProps = {
    theme?: string;
} & typeof defaultProps;

const defaultProps = {
    theme: "dark"
};

// Basic Login button for auth0
export const LoginButton = (props: React.ReactNode<ButtonProps>): React.JSX.Element => {
  // const {isAuthorized, user} = useAuth0();
  //
  const { theme, className } = props;
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
    });
  };

  return (
    <UI.Theme className={twMerge(className,clsx(['bg-primary']))} dataTheme={theme}>
      <UI.Button onClick={handleLogin}>Login</UI.Button>
    </UI.Theme>
  );
}

// Basic Logout button for auth0
export const LogoutButton = (props: React.ReactNode<ButtonProps>): React.JSX.Element => {
    // const {isAuthorized, user} = useAuth0();

  const { theme, className } = props;
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

    return (
      <UI.Theme className={twMerge(className,clsx(['bg-primary']))} dataTheme={theme}>
        <UI.Button onClick={handleLogout}>Logout</UI.Button>
      </UI.Theme>
    );
}

export const SignupButton = (props: React.ReactNode<ButtonProps>): React.JSX.Element => {
  const { theme, className } = props;
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
    <UI.Theme className={twMerge(className,clsx(['bg-primary']))}>
      <UI.Button onClick={handleSignUp}>Logout</UI.Button>
    </UI.Theme>
  );
};

export default Object.assign("AuthElement", {
    SignupButton,
    LoginButton,
    LogoutButton
});
