import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { Header } from '@3um-group/atomic-sdk';
import AppRoutes from './routes/AppRoutes';
import useAuth from './hooks/useAuth';
import SidebarItems from './components/Sidebar/SidebarItems';

const App: React.FC = () => {
    return (
        <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN!}
            clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
        >
            <div className="h-screen flex flex-col z-1">
                <Header
                    logoProps={{
                        alt: 'Company Logo',
                        customLightSrc: '/assets/3UM-dark-logo.png',
                        customDarkSrc: '/assets/3UM-white-logo.png',
                        height: 100,
                        width: 100,
                    }}
                    useAuth={useAuth}
                    sidebarProps={{
                        children: <SidebarItems />
                    }}
                />

                <div className="flex-1 flex justify-center items-start">
                    <div className="w-full max-w-6xl">
                        <AppRoutes /> {/* Separate Routes Configuration */}
                    </div>
                </div>
            </div>
        </Auth0Provider>
    );
};

export default App;
