import React, { useState, useEffect } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { Header, PropertyListCard, NewsCard } from '@3um-group/atomic-sdk'; 
import AuthButton from './components/AuthButton';
import { Routes, Route, Link } from 'react-router-dom';
import Wallet from './pages/Wallet';
import PropertyDetails from './pages/PropertyDetails';
import properties from './data/properties';
import PropertyCarousel from 'src/components/PropertyDetails/PropertyCarousel';

const App: React.FC = () => {
  const [newsArticles, setNewsArticles] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=07f43684d91543c3a708314441a617d0'
        );
        const data = await response.json();
        setNewsArticles(data.articles); 
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []); 
  
  function sidebarItems() {
    return (
      <>
        <li key="account-activity"><a>Account Activity</a></li>
        <li key="messages"><a>Messages</a></li>
        <li key="change-theme"><a>Change Theme</a></li>
        <li key="connect-wallet"><a className="btn btn-primary">Connect Wallet</a></li>
        <li><AuthButton /></li>
        {/* TODO: Login btns here */}
      </>
    );
  }

  function PropertyList() {
    return (
      <>
        {/* <div className='h-500 w-full overflow-x-auto'> */}
          <PropertyCarousel />
        {/* </div> */}
        <div className="flex flex-col md:flex-row gap-6 justify-center w-full mb-7">
          <div className="flex-1 w-full max-w-3xl flex flex-col gap-6">
            {properties.map((property) => (
              <Link to={`/property-details/${property.id}`} key={property.id}>
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
                  className="w-full"
                  onRegister={() => {
                    console.log("Register function not implemented");
                  } } />
              </Link>
            ))}
          </div>

          <div className="w-full md:w-1/4 flex flex-col gap-6">
            {loading ? (
              <p>Loading news...</p>
            ) : (
              newsArticles.slice(0, 4).map((article, index) => (
                <NewsCard
                  key={index}
                  imageSrc={article.urlToImage || 'https://via.placeholder.com/150'}
                  title={article.title}
                  description={article.description}
                  date={new Date(article.publishedAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                  linkUrl={article.url}
                  className="w-full" />
              ))
            )}
          </div>
        </div>
      </>
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
          sidebarProps={{
            children: sidebarItems()
          }}
        />

        <div className="flex-1 flex justify-center items-start -z-10">
          <div className="w-full max-w-6xl"> 
            <Routes>
              <Route path="/" element={<PropertyList />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/property-details/:id" element={<PropertyDetails />} />
            </Routes>
          </div>
        </div>

      </div>
    </Auth0Provider>
  );
};

export default App;
