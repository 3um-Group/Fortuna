import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Header from './components/Header/Header';
import { LoginButton, LogoutButton } from './components/AuthElement';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  console.log("Authorized ?", isAuthenticated)

  return (
    <>
      <Header>
        {isAuthenticated ? (
          <LogoutButton theme="dark" />
        ) : (
          <LoginButton theme="dark" />
        )}
      </Header>
      {isAuthenticated && <p>Welcome! You are logged in.</p>}
    </>
  );
};

export default App;