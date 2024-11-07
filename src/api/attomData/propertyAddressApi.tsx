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
    stateCode: string = "NY",
    limit: number = 10,
    offset: number = 0,
    sortField: string = "list_date",
    sortDirection: string = "desc"
  ): Promise<Property[]> => {
    const apiKey = '674747f3dbmshf7639c3f56ea249p1928afjsn7d5f92a85098'; // Replace with your actual RapidAPI key
  
    const response = await fetch('https://realtor-com4.p.rapidapi.com/properties/list', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'realtor-com4.p.rapidapi.com',
        'x-rapidapi-key': apiKey,
      },
      body: JSON.stringify({
        query: {
          status: ["for_sale", "ready_to_build"],
          state_code: stateCode,
        },
        limit,
        offset,
        sort: {
          direction: sortDirection,
          field: sortField,
        },
      }),
    });
  
    if (!response.ok) {
      throw new Error(`Error fetching Realtor properties: ${response.statusText}`);
    }
  
    const data = await response.json();
    
    return data.data.home_search.properties.map((item: any) => ({
      id: item.property_id.toString(),
      location: item.location.address.city + ", " + item.location.address.state_code,
      address: item.location.address.line,
      price: item.list_price ? `$${item.list_price.toLocaleString()}` : "N/A",
      imageSrc: item?.primary_photo?.href || "https://via.placeholder.com/150", // Placeholder if no image available
      imageAlt: 'Property Image',
      description: `Listed in ${item.location.address.city}`,
      badges: item.flags.is_new_listing ? [{ label: "New Listing" }] : [],
      beds: item.description.beds || 0,
      baths: item.description.baths_max || 0,
      sqft: item.description.sqft || 0,
      originalPrice: item.price_reduced_amount
        ? `$${(item.list_price - item.price_reduced_amount).toLocaleString()}`
        : "N/A",
      mortgage: "$" + Math.floor(Math.random() * 2000 + 1000).toLocaleString(), // Placeholder for mortgage
      propertyLink: `https://www.realtor.com/realestateandhomes-detail/${item.permalink}`, // Construct property link
    }));
  };
  