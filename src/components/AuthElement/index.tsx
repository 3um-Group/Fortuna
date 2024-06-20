import React from 'react';
import { Theme, Button } from 'react-daisyui';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth0 } from '@auth0/auth0-react';

type ButtonProps = {
  theme?: string;
  className?: string;
};

const defaultProps: Partial<ButtonProps> = {
  theme: 'dark',
};

// Login Button
export const LoginButton: React.FC<ButtonProps> = ({ theme = 'dark', className }) => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/profile',
      },
    });
  };

  return (
    <Theme className={twMerge(className, clsx(['bg-primary']))} dataTheme={theme}>
      <Button onClick={handleLogin}>Login</Button>
    </Theme>
  );
};

// Logout Button
export const LogoutButton: React.FC<ButtonProps> = ({ theme = 'dark', className }) => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Theme className={twMerge(className, clsx(['bg-primary']))} dataTheme={theme}>
      <Button onClick={handleLogout}>Logout</Button>
    </Theme>
  );
};

// Signup Button
export const SignupButton: React.FC<ButtonProps> = ({ theme = 'dark', className }) => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/profile',
      },
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  };

  return (
    <Theme className={twMerge(className, clsx(['bg-primary']))} dataTheme={theme}>
      <Button onClick={handleSignUp}>Sign Up</Button>
    </Theme>
  );
};

export default {
  LoginButton,
  LogoutButton,
  SignupButton,
};
