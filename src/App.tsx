import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Header } from '@3um-Group/atomic-sdk'
import { useThemeContext } from './context/ThemeContext';
const App: React.FC = () => {

//   const getLogoSrc = () => {
//     return theme === 'dark' ? '/assets/3UM-white-logo.png' : '/assets/3UM-dark-logo.png';
// };
  const { theme } = useThemeContext();
  const useAuth = () => {
    const auth0 = useAuth0();
    return {
      isAuthenticated: auth0.isAuthenticated,
      loginWithRedirect: auth0.loginWithRedirect,
      logout: auth0.logout,
    };
  };

  // console.log("yey",useAuth().loginWithRedirect())

  return (
    <div className='mx-6 mt-2'>
      <Header
        logoProps={{
          alt: 'Company Logo',
          customLightSrc:'/assets/3UM-dark-logo.png',
          customDarkSrc:'/assets/3UM-white-logo.png',
          height: 50,
          theme: 'light',
          width: 50,
        }}
        theme= {theme}
        useAuth={useAuth}
        showNavItems
      />
    </div>
  );
};

export default App;