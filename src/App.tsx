import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Header, Sidebar, SearchBar, PropertyListCard } from '@3um-group/atomic-sdk';
// import { useThemeContext } from './context/ThemeContext';
const App: React.FC = () => {

//   const getLogoSrc = () => {
//     return theme === 'dark' ? '/assets/3UM-white-logo.png' : '/assets/3UM-dark-logo.png';
// };
  // const { theme } = useThemeContext();

  var properties = [
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

  var PropertyList: React.FC = () => {
    return (
      <>
        {_.map(properties, property => (
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
              onRegister={function (): void {
                throw new Error('Function not implemented.');
              }}
            />
        ))}
      </>
    );
  };

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
    <div className='h-screen flex flex-col'>
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
      <div>
        <SearchBar data-test-id="search-bar"
          onChange={(event) => { console.log(event); }}
          onSearch={() => {}}
          placeholder="Enter to search"
          value=""
        />
        <Sidebar children={'test child'} />
        <PropertyList />
      </div>
    </div>
  );
};

export default App;