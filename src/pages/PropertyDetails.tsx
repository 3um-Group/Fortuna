import React, { useEffect, useState } from 'react';
import { PropertyDetailsPage, MarketPriceChart } from '@3um-group/atomic-sdk';
import { useParams } from 'react-router-dom';
import MapView from '../components/PropertyDetails/MapView';
import PropertyCarousel from '../components/PropertyDetails/PropertyCarousel';
import PropertyDrawerMenu from '../components/PropertyDetails/PropertyDrawerMenu';

import { fetchPropertyDetail, PropertyDetail } from '../api/attomData/propertyDetail';

interface PropertyDetailsProps {
    showMarketPriceChart?: boolean;
    showSimilarHomes?: boolean;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
    showMarketPriceChart = true,
    showSimilarHomes = true,
}) => {
    const { id } = useParams<{ id: string }>();
    const [property, setProperty] = useState<PropertyDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const propertyDetail = await fetchPropertyDetail(id!);
                setProperty(propertyDetail);
            } catch (err) {
                setError('Failed to fetch property details');
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return <div className="text-center">Loading property details...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-[215vh] relative">
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
            />

            {/* Local Information Section */}
            <div className="h-500 w-full">
                <div className="text-xl ms-4 py-2">Local Information</div>
                <MapView 
                  position={[property?.latitude || 51.505, property?.longitude || -0.09]} 
                  popupContent={property?.description || 'No description available'}
                />
            </div>

            {/* Market Price Chart - conditional rendering based on A/B test */}
            {showMarketPriceChart && (
                <div className="h-500 w-full my-4 p-4 rounded-lg bg-gray-100">
                    {property?.marketPriceData ? (
                        <MarketPriceChart data={property.marketPriceData} className="bg-gray-100 p-4 rounded-lg" />
                    ) : (
                        <p className="text-center text-gray-500">Market price data not available.</p>
                    )}
                </div>
            )}

            {/* Similar Homes Section - conditional rendering based on A/B test */}
            {showSimilarHomes && (
                <div className="h-500 w-full">
                    <div className="text-xl ms-4 py-2">Similar Homes You May Like</div>
                    <PropertyCarousel />
                </div>
            )}

            <PropertyDrawerMenu />
        </div>
    );
};

export default PropertyDetails;
