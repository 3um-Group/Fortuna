import { useAuth0 } from '@auth0/auth0-react';

const useAuth = () => {
    const auth0 = useAuth0();
    return {
        isAuthenticated: auth0.isAuthenticated,
        loginWithRedirect: auth0.loginWithRedirect,
        logout: auth0.logout,
        user: auth0.user,
    };
};

export default useAuth;
