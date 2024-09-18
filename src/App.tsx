import React from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { Header, Sidebar, SearchBar, PropertyListCard } from '@3um-group/atomic-sdk';
import AuthButton from './components/AuthButton';
import { Routes, Route } from 'react-router-dom';
import Wallet from './pages/Wallet';
// import { useThemeContext } from './context/ThemeContext';

const App: React.FC = () => {

  //   const getLogoSrc = () => {
//     return theme === 'dark' ? '/assets/3UM-white-logo.png' : '/assets/3UM-dark-logo.png';
// };
  // const { theme } = useThemeContext();

  // interface Props {
  //   children: React.ReactElement
  // }

  function sidebarItems() {
    return (
      <>
        <li><a>Account Activity</a></li>
        <li><a>Messages</a></li>
        <li><a>Change Theme</a></li>
        <li><a className='btn btn-primary'>Connect Wallet</a></li>
      </>
    );
  }

  function PropertyList() {

    const properties = [
      {
        id: 1,
        location: "Atlanta, GA 30306",
        price: "$2,500,000",
        imageSrc:"https://media-cdn.trulia-local.com/neighborhood-media-service-prod/ma/boston/hyde-park/1269-ma_bos_hyde_park_154775_23_500x_cfit.jpg",
        imageAlt:"Beautiful Home",
        description:"1941 Lenox Rd NE",
        badges:[{
          label: 'Cash Only'
        },{
          label: 'Reported Vacant'
        },
        {
          label: 'No Buyers Premium'
        },
        {
          label: 'Open House' }],
        beds:3,
        baths:3,
        sqft:3567,
      },
      {
        id: 2,
        location: "Los Angeles, CA",
        price: "$2,500,000",
        imageSrc:"https://www.trulia.com/pictures/thumbs_4/zillowstatic/fp/193b33e8d7dfa790389c1b76f89fa9ce-full.webp",
        imageAlt:"Beautiful Home",
        description:'',
        badges:[{
          label: 'Cash Only'
        },
        {
          label: 'No Buyers Premium'
        },
        {
          label: 'Open House' }],
        beds:3,
        baths:3,
        sqft:3567,
      },
      {
        id: 3,
        location: "Miami, FL",
        price: "$3,200,000",
        imageSrc:"https://www.trulia.com/pictures/thumbs_4/zillowstatic/fp/0192d9de7bbdd118f04606b8cdda1bfe-full.webp",
        imageAlt:"Beautiful Home",
        description:'',
        badges:[],
        beds:3,
        baths:3,
        sqft:3567,
      },
      {
        id: 4,
        location: "Wake Forest, NC",
        price: "$2,500,000",
        imageSrc:"https://www.trulia.com/pictures/thumbs_4/zillowstatic/fp/a5271aa82e1dcaa09585bdeecaaeb48c-full.webp",
        imageAlt:"Beautiful Home",
        description:'',
        badges:[],
        beds:3,
        baths:3,
        sqft:3567,
      },
      {
        id: 5,
        location: "Los Angeles, CA",
        price: "$2,500,000",
        imageSrc:"https://www.trulia.com/pictures/thumbs_4/zillowstatic/fp/a3a57cddb5b77a3419c58a274bc78bac-full.webp",
        imageAlt:"Beautiful Home",
        description:'',
        badges:[],
        beds:3,
        baths:3,
        sqft:3567,
      },
      {
        id: 6,
        location: "Los Angeles, CA",
        price: "$2,500,000",
        imageSrc:"https://www.trulia.com/pictures/thumbs_4/zillowstatic/fp/375b3d96fa5dc5b3300fe64a35fa46c3-full.webp",
        imageAlt:"Beautiful Home",
        description:'',
        badges:[{
          label: 'Cash Only'
        },
        {
          label: 'Open House' }],
        beds:3,
        baths:3,
        sqft:3567,
      },
      {
        id: 7,
        location: "Los Angeles, CA",
        price: "$2,500,000",
        imageSrc:"https://www.trulia.com/pictures/thumbs_4/zillowstatic/fp/f12c332aec7b9eb832bf6435a6f4cb55-full.webp",
        imageAlt:"Beautiful Home",
        description:'',
        badges:[{
          label: 'Cash Only'
        },
        {
          label: 'Open House' }],
        beds:3,
        baths:3,
        sqft:3567,
      },
      {
        id: 8,
        location: "Los Angeles, CA",
        price: "$2,500,000",
        imageSrc:"https://www.trulia.com/pictures/thumbs_4/zillowstatic/fp/1f0675b4218cef35f9e9f062b947fff2-full.webp",
        imageAlt:"Beautiful Home",
        description:'',
        badges:[{ label: 'Open House' }],
        beds:3,
        baths:3,
        sqft:3567,
      },
      {
        id: 9,
        location: "Raleigh, NC",
        price: "$2,500,000",
        imageSrc:"https://www.trulia.com/pictures/thumbs_4/zillowstatic/fp/228e3a80c0a443392135daaf714a7041-full.webp",
        imageAlt:"Beautiful Home",
        description:'',
        badges:[{ label: 'Open House' }],
        beds:3,
        baths:3,
        sqft:3567,
      },
      {
        id: 10,
        location: "Raleigh, NC",
        price: "$2,500,000",
        imageSrc:"https://www.trulia.com/pictures/thumbs_4/zillowstatic/fp/680e1d487784cf004c5e9bbe2f3bb9ed-full.webp",
        imageAlt:"Beautiful Home",
        description:"",
        badges:[{ label: 'Open House' }],
        beds:3,
        baths:3,
        sqft:3567,
      }
    ];

    return (
      <div className="flex flex-col items-center gap-6 mt-6 w-full max-w-3xl"> 
        <SearchBar
          data-test-id="search-bar"
          onChange={(event) => { console.log(event); }}
          onSearch={() => {}}
          placeholder="Enter to search"
          value=""
          className="w-full"
        />
        <AuthButton />
        {properties.map((property) => (
          <PropertyListCard
            key={property.id}
            badgeColors={{
              'Cash Only': 'bg-transparent text-red-500 border border-red-500',
              'No Buyers Premium': 'bg-transparent text-blue-500 border border-blue-500',
              'Open House': 'bg-transparent text-orange-500 border border-orange-500',
              'Reported Vacant': 'bg-transparent text-black border border-black'
            }}
            imageSrc={property.imageSrc}
            imageAlt={property.imageAlt}
            price={property.price}
            description={property.description}
            location={property.location}
            badges={property.badges}
            beds={property.beds}
            baths={property.baths}
            sqft={property.sqft}
            className="max-w-3xl w-full"
            onRegister={() => {
              console.log("Register function not implemented");
            }}
          />
        ))}
      </div>
    );
  }

  const useAuth = () => {
    const auth0 = useAuth0();
    return {
      isAuthenticated: auth0.isAuthenticated,
      loginWithRedirect: auth0.loginWithRedirect,
      logout: auth0.logout,
    };
  };

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN!}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
    >
      <div className="h-screen flex flex-col">
        <Header
          logoProps={{
            alt: 'Company Logo',
            customLightSrc: '/assets/3UM-dark-logo.png',
            customDarkSrc: '/assets/3UM-white-logo.png',
            height: 50,
            width: 50,
          }}
          useAuth={useAuth}
          showNavItems
        />

        <Sidebar children={sidebarItems()} />

        <div className="flex-1 flex justify-center items-center">
          <div className="w-full max-w-3xl">
            <Routes>
              <Route path="/" element={<PropertyList />} /> {/* Render PropertyList via Routes */}
              <Route path="/wallet" element={<Wallet />} />
            </Routes>
          </div>
        </div>
      </div>
    </Auth0Provider>
  );
};

export default App;
