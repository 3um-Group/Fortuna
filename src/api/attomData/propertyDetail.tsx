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
  
  export const fetchPropertyDetail = async (attomId: string): Promise<PropertyDetail> => {
    const apiKey = '2b1e86b638620bf2404521e6e9e1b19e'; // Replace with your actual API key
    const response = await fetch(
      `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?attomid=${attomId}`,
      {
        headers: {
          Accept: 'application/json',
          apikey: apiKey,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error(`Error fetching property details: ${response.statusText}`);
    }
  
    const data = await response.json();
  
    // Mapping the property details to your desired structure
    const property = data.property[0]; // Assuming the first property is the one you're interested in
  
    return {
      id: property.identifier.Id.toString(),
      location: `${property.address.locality}, ${property.address.countrySubd}`,
      address: property.address.line1,
      price: `$${property.lot.lotsize2.toLocaleString()}`, // You can adjust the price logic as needed
      imageSrc: "https://www.trulia.com/pictures/thumbs_4/zillowstatic/fp/193b33e8d7dfa790389c1b76f89fa9ce-full.webp", // Placeholder
      imageAlt: 'Beautiful Home',
      description: property.summary.legal1 || "No description available", // Adjust this as needed
      badges: [
        { label: 'Cash Only' }, // Placeholder badges, you can adjust as needed
        { label: 'No Buyers Premium' },
        { label: 'Open House' },
      ],
      beds: property.building.rooms.beds,
      baths: property.building.rooms.bathsfull,
      sqft: property.building.size.livingsize,
      originalPrice: `$${property.lot.lotsize2.toLocaleString()}`, // Placeholder, can adjust
      mortgage: "$10,000", // Placeholder
      initialMessage: '',
      initialPhone: '',
      initialEmail: '',
      propertyLink: '#', // Placeholder link
      marketPriceData: [
        { date: '223-08-1', volume: 0.15, averagePrice: 0.20 }, // Placeholder market price data
        { date: '223-09-1', volume: 0.13, averagePrice: 0.18 },
      ],
      latitude: property.location.latitude || 0,   // Ensure to access latitude from the response
        longitude: property.location.longitude || 0, // Ensure to access longitude from the response
    };
  };
  