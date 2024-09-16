import React from 'react';
import { Button } from '@3um-group/atomic-sdk';
import { useAuth0 } from '@auth0/auth0-react';

const AuthButton: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <>
      {isAuthenticated ? (
        <Button className='neutral' onClick={() => logout()}>
          Logout
        </Button>
      ) : (
        <Button className='neutral' onClick={() => loginWithRedirect()}>
          Login with WebAuthn (Auth0)
        </Button>
      )}
    </>
  );
};

export default AuthButton;
