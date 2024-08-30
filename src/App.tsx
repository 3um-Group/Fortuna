import React, { useCallback, useState } from 'react';
import {useWebAuthn} from 'react-hook-webauthn';
import { useAuth0 } from '@auth0/auth0-react';
import { Header } from '@3um-group/atomic-sdk'
// import { useThemeContext } from './context/ThemeContext';

const App: React.FC = () => {

  const rpOptions = {
    rpId: 'localhost',
    rpName: 'my super app'
  }
  const [login, setLogin] = useState('')
  const {getCredential, getAssertion} = useWebAuthn(rpOptions)
  
  const onChangeLogin = useCallback((e: any) => {
    setLogin(e.target.value)
  }, [])
  
  const onRegister = useCallback(async  () => {
    const credential = await getCredential({
      challenge: 'stringFromServer',
      userDisplayName: login,
      userId: login,
      userName: login
    })
    console.log(credential)
  }, [getCredential, login])
  
  const onAuth = useCallback(async () => {
    const assertion =  await getAssertion({challenge: 'stringFromServer'})
    console.log(assertion)
  }, [getAssertion])
  
//   const getLogoSrc = () => {
//     return theme === 'dark' ? '/assets/3UM-white-logo.png' : '/assets/3UM-dark-logo.png';
// };
  // const { theme } = useThemeContext();
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
          // theme: 'light',
          width: 50,
        }}
        // theme= {theme}
        useAuth={useAuth}
        showNavItems
      />
    </div>
    // <div className="section">
    //   <input onInput={onChangeLogin} placeholder="login" type="text"/>
    //    <button onClick={onRegister} type="button">register</button>
    //   <button onClick={onAuth} type="button">auth</button>
    // </div>
  );
};

export default App;