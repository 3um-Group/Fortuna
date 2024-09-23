import React from 'react';
import { PropertyDetailsPage } from '@3um-group/atomic-sdk';
import properties from '../data/properties';
import { useParams } from 'react-router-dom';
import MapView from 'src/components/PropertyDetails/MapView';
import PropertyCarousel from 'src/components/PropertyDetails/PropertyCarousel';
import PropertyDrawerMenu from 'src/components/PropertyDetails/PropertyDrawerMenu';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const property = properties.find((property) => property.id === id);
  console.log(property);
  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen relative">
      <PropertyDetailsPage
        imageUrl={property?.imageSrc || 'default-image-url.jpg'}
        address={property?.address || ''}
        price={property?.price || '123456'} 
        originalPrice={property?.originalPrice || '123456'} 
        mortgage={property?.mortgage || '123456'} 
        beds={property?.beds || 0} 
        baths={property?.baths || 0} 
        sqft={property?.sqft || 0} 
        description={property?.description || ''} 
        propertyLink={'this is the link'} 
        location={property?.location || ''} 
        initialPhone={''} 
        initialEmail={''} 
        initialMessage={''} 
      />
      <div className='h-500 w-full'>
        <div className='text-xl ms-4 py-2'>Local Information</div>
        <MapView />
      </div>
      <div className='h-500 w-full'>
        <div className='text-xl ms-4 py-2'>Similar Homes You May Like</div>
        <PropertyCarousel />
      </div>
      <PropertyDrawerMenu />
    </div>
  );
};
export default PropertyDetails;