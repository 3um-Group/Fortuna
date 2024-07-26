import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Header from './components/Header/Header';
import { LoginButton, LogoutButton } from './components/AuthElement';
import EmblaCarousel from './components/ProductDetailsCarousel/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'

import './components/ProductDetailsCarousel/css/base.css'
import './components/ProductDetailsCarousel/css/sandbox.css'
import './components/ProductDetailsCarousel/css/embla.css'

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true, slidesToScroll: "auto" }
const SLIDE_COUNT = 5
// const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const SLIDES = Array.from(Array(SLIDE_COUNT).keys()).map(i => `/assets/properties/property${i + 1}.jpg`);

console.log(SLIDES)
console.log(OPTIONS)
const App: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  console.log("Authorized ?", isAuthenticated)

  return (
    <>
      <Header theme="dark">
        {isAuthenticated ? (
          <LogoutButton theme="dark" />
        ) : (
          <LoginButton theme="dark" />
        )}
      </Header>
      {isAuthenticated && <p>Welcome! You are logged in.</p>}
      <div className="theme-dark">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
    </>
  );
};

export default App;