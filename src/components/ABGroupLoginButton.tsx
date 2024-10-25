import { useOAuth } from '../hooks/use0Auth';

export const LoginButton: React.FC = () => {

  const { login, testGroup } = useOAuth();

  return (
    <button 
      onClick={login}
      className="px-4 py-2 bg-blue-500 text-white rounded"
      data-testid={`oauth-login-${testGroup}`}
    >
      Sign In
    </button>
  );
};