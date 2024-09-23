import { PropertyListCard } from '@3um-group/atomic-sdk';
import properties from 'src/data/properties';
const PropertyCarousel = ({ }) => {
    return (
        <div className="overflow-x-auto whitespace-nowrap">
          <div className="flex space-x-4 p-4">
            {properties.map(property => (
              <div className="flex-none w-64 h-100" key={property.id}> {/* Fixed height added */}
                <PropertyListCard
                  badgeColors={{
                    'Cash Only': 'bg-transparent text-red-500 border border-red-500',
                    'No Buyers Premium': 'bg-transparent text-blue-500 border border-blue-500',
                    'Open House': 'bg-transparent text-orange-500 border border-orange-500',
                    'Reported Vacant': 'bg-transparent text-black border border-black'
                  }}
                  imageSrc={property.imageSrc}
                  imageAlt={property.imageAlt}
                  price={property.price}
                  description={''}
                  location={property.location}
                  badges={property.badges}
                  beds={property.beds}
                  baths={property.baths}
                  sqft={property.sqft}
                  className="w-full h-full" // Ensure card uses full height
                  onRegister={() => {
                    console.log("Register function not implemented");
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      );
};

export default PropertyCarousel;
