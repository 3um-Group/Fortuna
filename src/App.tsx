import React, { useState, useEffect } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { Header } from '@3um-group/atomic-sdk';
import AppRoutes from './routes/AppRoutes';
import SidebarItems from './components/Sidebar/SidebarItems';
import SplashScreen from './pages/SplashScreen';
import useAuth from './hooks/useAuth';

const App: React.FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
            clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ''}
            authorizationParams={{
                redirect_uri: window.location.origin,
            }}
        >
            <div className="h-screen flex flex-col z-1">
                {loading ? (
                    <SplashScreen />
                ) : (
                    <>
                        <Header
                            logoProps={{
                                alt: 'Company Logo',
                                customLightSrc: '/assets/3UM-dark-logo.png',
                                customDarkSrc: '/assets/3UM-white-logo.png',
                                height: 100,
                                width: 100,
                            }}
                            sidebarProps={{
                                children: <SidebarItems />,
                                useAuth: useAuth
                            }}
                        />
                        <div className="flex-1 flex justify-center items-start">
                            <div className="w-full max-w-6xl">
                                <AppRoutes />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Auth0Provider>
    );
};

export default App;
