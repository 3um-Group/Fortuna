import React from 'react';
import * as UI from 'react-daisyui';

// Basic Login button for auth0
const LoginButton = (): React.JSX.Element => {
    // const {isAuthorized, user} = useAuth0();

    return (
        <UI.Theme dataTheme="dark">
            <UI.Button>Login</UI.Button>
        </UI.Theme>
    );
}

// Basic Logout button for auth0
const LogoutButton = (): React.JSX.Element => {
    // const {isAuthorized, user} = useAuth0();

    return (
        <UI.Theme dataTheme="dark">
            <UI.Button>Logout</UI.Button>
        </UI.Theme>
    );
}

export LoginButton;
export LogoutButton;
