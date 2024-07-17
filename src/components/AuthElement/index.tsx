import React from 'react';
import * as UI from 'react-daisyui';
// import { twMerge } from 'tailwind-merge';
import { useAuth0 } from "@auth0/auth0-react";

type ButtonProps = {
  theme: string;
  className?: string;
};

// Basic Login button for auth0
export const LoginButton: React.FC<ButtonProps> = ({ theme, className }) => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
  };

  return (
    // <UI.Theme
    //   className={twMerge('flex justify-center items-center h-10', className)}
    //   dataTheme={theme}
    // >
    
      <UI.Button  dataTheme={theme} onClick={handleLogin}>Login</UI.Button>
    // </UI.Theme>
  );
}

// Basic Logout button for auth0
export const LogoutButton: React.FC<ButtonProps> = ({ theme, className }) => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    // <UI.Theme
    //   className={twMerge('flex justify-center items-center h-10', className)}
    //   dataTheme={theme}
    // >
      <UI.Button  dataTheme={theme} onClick={handleLogout}>Logout</UI.Button>
    // </UI.Theme>
  );
}

export default Object.assign("AuthElement", {
  LoginButton,
  LogoutButton
});
