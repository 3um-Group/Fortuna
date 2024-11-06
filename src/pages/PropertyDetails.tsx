import React, { useEffect, useState } from 'react';
import { PropertyDetailsPage, MarketPriceChart } from '@3um-group/atomic-sdk';
import { useParams } from 'react-router-dom';
import PropertyCarousel from '../components/PropertyDetails/PropertyCarousel';
import PropertyDrawerMenu from '../components/PropertyDetails/PropertyDrawerMenu';
import { fetchPropertyDetail, PropertyDetail } from '../api/attomData/propertyDetail'; // Adjust the import path as needed

// Dummy data to use in case of an API failure
const dummyProperty: PropertyDetail = {
    id: "dummy",
    location: "Sample Location, CA 12345",
    address: "1234 Sample St",
    price: "$1,000,000",
    imageSrc: "https://via.placeholder.com/800x400?text=Sample+Property",
    imageAlt: "Sample Property",
    description: "This is a sample property description used as fallback data.",
    badges: [{ label: "Open House" }],
    beds: 4,
    baths: 3,
    sqft: 2500,
    originalPrice: "$1,200,000",
    mortgage: "$5,000/month",
    initialMessage: '',
    initialPhone: '',
    initialEmail: '',
    propertyLink: '#',
    latitude: 34.0522,
    longitude: -118.2437,
    marketPriceData: [
        { date: '2023-08-01', volume: 0.15, averagePrice: 0.20 },
        { date: '2023-09-01', volume: 0.13, averagePrice: 0.18 },
        { date: '2023-10-01', volume: 0.16, averagePrice: 0.21 },
    ]
};

const PropertyDetails: React.FC = () => {
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
                console.error("Failed to fetch property details, using dummy data", err);
                setError('Failed to fetch property details. Displaying sample data.');
                setProperty(dummyProperty); // Use dummy data in case of error
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

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-[215vh] relative">
            {error && (
                <div className="text-center text-red-500 mb-4">{error}</div>
            )}

            {/* Property Details */}
            <PropertyDetailsPage
                imageUrl={property?.imageSrc || 'https://via.placeholder.com/800x400?text=Default+Image'}
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
                <iframe
                    title="Property Location"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${property?.longitude || -118.2437}%2C${property?.latitude || 34.0522}%2C${property?.longitude || -118.2437}%2C${property?.latitude || 34.0522}&layer=mapnik`}
                    style={{ border: 'none', width: '100%', height: '400px' }}
                    allowFullScreen
                ></iframe>
            </div>

            <div className="h-500 w-full my-4 p-4 rounded-lg bg-gray-100">
                {property?.marketPriceData ? (
                    <MarketPriceChart data={property.marketPriceData} className="bg-gray-100 p-4 rounded-lg" />
                ) : (
                    <p className="text-center text-gray-500">Market price data not available.</p>
                )}
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
