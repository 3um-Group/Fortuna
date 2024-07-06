import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Header from './components/Header/Header';

// const LoginButton: React.FC = () => {
//   const { loginWithRedirect } = useAuth0();

//   return <button onClick={() => loginWithRedirect()}>Log In</button>;
// };

const App: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  console.log("Authorized ?", isAuthenticated)

  return (
    <>
      <Header isLoggedIn={isAuthenticated} onLogin={() => loginWithRedirect()} onLogout={() => logout({
        returnTo: window.location.origin,
      })} />

      {isAuthenticated && <p>Welcome! You are logged in.</p>}
    </>
  );
};

export default App;