export interface Property {
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
    propertyLink: string;
  }
  
  export const fetchProperties = async (
    postalcode: string = "82009",
    page: number = 1,
    pagesize: number = 10,
    orderby?: string,
    propertytype?: string
  ): Promise<Property[]> => {
    const apiKey = '8b797cd2f116087923bb52b214f17947'; // Replace with your actual API key
  
    // Construct the query parameters
    const params = new URLSearchParams({
        postalcode,
        page: page.toString(),
        pagesize: pagesize.toString(),
        ...(orderby && { orderby }), // Only include if defined
        ...(propertytype && { propertytype }), // Only include if defined
    });
  
    const response = await fetch(
        `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/address?${params.toString()}`,
        {
            headers: {
                Accept: 'application/json',
                apikey: apiKey,
            },
        }
    );
  
    if (!response.ok) {
        throw new Error(`Error fetching properties: ${response.statusText}`);
    }
  
    const data = await response.json();
  
    return data.property.map((item: any) => ({
        id: item.identifier.Id.toString(),
        location: item.address.oneLine,
        address: item.address.line1,
        price: "$" + Math.floor(Math.random() * 1000000).toLocaleString(), // Placeholder for price
        imageSrc: "https://www.trulia.com/pictures/thumbs_4/zillowstatic/fp/193b33e8d7dfa790389c1b76f89fa9ce-full.webp",
        imageAlt: 'Property Image',
        description: `Property located at ${item.address.oneLine}`, // Placeholder description
        badges: [],
        beds: Math.floor(Math.random() * 5) + 1, // Random number of beds
        baths: Math.floor(Math.random() * 3) + 1, // Random number of baths
        sqft: Math.floor(Math.random() * 3000) + 1000, // Random sqft
        originalPrice: "$" + Math.floor(Math.random() * 1000000).toLocaleString(), // Placeholder for original price
        mortgage: "$" + Math.floor(Math.random() * 2000 + 1000).toLocaleString(), // Placeholder for mortgage
        propertyLink: '#', // Placeholder link
    }));
  };
  