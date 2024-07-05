import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const App: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  console.log("Authorized ?", isAuthenticated)

  return (
    <div>
      <h1>My App</h1>
      {!isAuthenticated && <LoginButton />}
      {isAuthenticated && <p>Welcome! You are logged in.</p>}
    </div>
  );
};

export default App;