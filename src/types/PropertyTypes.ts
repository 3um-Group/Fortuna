export interface Property {
    id: number;
    badges: { label: string }[];
    beds: number;
    baths: number;
    sqft: number;
    imageSrc: string;
    imageAlt: string;
    price: string;
    description: string;
    location: string;
  }
  