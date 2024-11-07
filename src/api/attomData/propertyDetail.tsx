export interface PropertyDetail {
  id: string;
  location: string;
  address: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  badges: { label: string }[];
  beds: number;
  baths: number;
  sqft: number;
  originalPrice: string;
  mortgage: string;
  initialMessage: string;
  initialPhone: string;
  initialEmail: string;
  propertyLink: string;
  marketPriceData: { date: string; volume: number; averagePrice: number }[];
  latitude: number;
  longitude: number;
}

export const fetchPropertyDetail = async (propertyId: string): Promise<PropertyDetail> => {
  const apiKey = '674747f3dbmshf7639c3f56ea249p1928afjsn7d5f92a85098'; // Replace with your actual RapidAPI key

  const response = await fetch(
    `https://realtor-com4.p.rapidapi.com/properties/detail?property_id=${parseInt(propertyId)}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'x-rapidapi-host': 'realtor-com4.p.rapidapi.com',
        'x-rapidapi-key': apiKey,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching property details: ${response.statusText}`);
  }

  const data = await response.json();
  const property = data.data.home; // Adjust this according to the response structure
  
  return {
    id: property.property_id,
    location: `${property?.location?.address?.city}, ${property?.location?.address?.state_code}`,
    address: property?.location?.address?.line,
    price: `$${property.list_price}`,
    imageSrc: property.primary_photo?.href || "https://www.trulia.com/pictures/thumbs_4/zillowstatic/fp/193b33e8d7dfa790389c1b76f89fa9ce-full.webp", // Use first image as placeholder
    imageAlt: 'Property Image',
    description: property?.description?.text || "No description available",
    badges: property.tags.map((tag: string) => ({ label: tag })),
    beds: property?.description?.beds,
    baths: property?.description?.baths,
    sqft: property?.description?.sqft,
    originalPrice: `$${property.price}`, // Placeholder, adjust as necessary
    mortgage: "$10,000", // Placeholder
    initialMessage: '',
    initialPhone: '',
    initialEmail: '',
    propertyLink: property?.provider_url?.href, // Assuming URL field is available
    marketPriceData: [], // Populate if historical data is provided
    latitude: property?.location?.address?.coordinate?.lat || 0,
    longitude: property?.location?.address?.coordinate?.lon || 0,
  };
};

