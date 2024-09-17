import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthButton: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={() => logout()}>
          Logout
        </button>
      ) : (
        <button onClick={() => loginWithRedirect()}>
          Login with WebAuthn (Auth0)
        </button>
      )}
    </div>
  );
};

export default AuthButton;
