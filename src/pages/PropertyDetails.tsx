import React, { useEffect } from 'react';
import { PropertyDetailsPage } from '@3um-group/atomic-sdk';
import properties from '../data/properties';
import { useParams } from 'react-router-dom';
import MapView from '../components/PropertyDetails/MapView';
import PropertyCarousel from '../components/PropertyDetails/PropertyCarousel';
import PropertyDrawerMenu from '../components/PropertyDetails/PropertyDrawerMenu';

const PropertyDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // Find the property based on the ID from the URL
    const property = properties.find((property) => property.id === id);

    // Scroll to top when component mounts or property ID changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen relative">
            {/* Property Details */}
            <PropertyDetailsPage
                imageUrl={property?.imageSrc || 'default-image-url.jpg'}
                address={property?.address || 'Address not available'}
                price={property?.price || 'N/A'}
                originalPrice={property?.originalPrice || 'N/A'}
                mortgage={property?.mortgage || 'N/A'}
                beds={property?.beds || 0}
                baths={property?.baths || 0}
                sqft={property?.sqft || 0}
                description={property?.description || 'Description not available'}
                propertyLink={property?.propertyLink || '#'}
                location={property?.location || 'Location not available'}
                initialPhone={property?.initialPhone || ''}
                initialEmail={property?.initialEmail || ''}
                initialMessage={property?.initialMessage || ''}
            />

            {/* Local Information Section */}
            <div className="h-500 w-full">
                <div className="text-xl ms-4 py-2">Local Information</div>
                <MapView />
            </div>

            {/* Similar Homes Section */}
            <div className="h-500 w-full">
                <div className="text-xl ms-4 py-2">Similar Homes You May Like</div>
                <PropertyCarousel />
            </div>

            {/* Property Drawer Menu */}
            <PropertyDrawerMenu />
        </div>
    );
};

export default PropertyDetails;
