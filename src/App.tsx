import React, { useState, useEffect } from 'react';
import { initNewRelic, NewRelicErrorBoundary } from './newRelic';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { Header } from '@3um-group/atomic-sdk';
import AppRoutes from './routes/AppRoutes';
import SidebarItems from './components/Sidebar/SidebarItems';
import SplashScreen from './pages/SplashScreen';
import useAuth from './hooks/useAuth';
import Signup from './pages/Signup';

// Separate the authenticated app content into its own component
const AuthenticatedApp: React.FC = () => {
  return (
    <>
      <Header
        logoProps={{
          alt: 'Company Logo',
          customLightSrc: '/assets/3UM-dark-logo.png',
          customDarkSrc: '/assets/3UM-white-logo.png',
          height: 50,
          width: 50,
        }}
        useAuth={useAuth}
        sidebarProps={{
          children: <SidebarItems />
        }}
      />
      <div className="flex-1 flex justify-center items-start">
        <div className="w-full max-w-6xl">
          <AppRoutes />
        </div>
      </div>
    </>
  );
};

// Main app wrapper that handles auth state
const AppWrapper: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const [showingSplash, setShowingSplash] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Show splash screen for minimum 2 seconds
    const splashTimer = setTimeout(() => {
      setShowingSplash(false);
    }, 2000);

    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    initNewRelic();
    // Handle authentication redirect after splash screen
    if (!showingSplash && !isAuthenticated && !isRedirecting && !isLoading) {
      const path = window.location.pathname;
      
      // Don't redirect if we're on the signup page
      if (path === '/signup') {
        return;
      }

      setIsRedirecting(true);
      loginWithRedirect();
    }
  }, [isAuthenticated, isRedirecting, loginWithRedirect, isLoading, showingSplash]);

  // Show splash screen during initial load
  if (showingSplash || isLoading) {
    return <SplashScreen />;
  }

  // Show signup page if that's where we are
  if (!isAuthenticated && window.location.pathname === '/signup') {
    return <Signup />;
  }

  // Show authenticated app if user is authenticated
  if (isAuthenticated) {
    return <AuthenticatedApp />;
  }

  // Show splash screen while redirecting to login
  return <SplashScreen />;
};

// Root component that provides Auth0 context
const App: React.FC = () => {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ''}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <div className="h-screen flex flex-col z-1">
        <NewRelicErrorBoundary>
          <AppWrapper />
        </NewRelicErrorBoundary>
      </div>
    </Auth0Provider>
  );
};

export default App;