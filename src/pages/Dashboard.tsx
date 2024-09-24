import PropertyCarousel from "../components/PropertyDetails/PropertyCarousel";
import properties from "../data/properties";
import {Link} from "react-router-dom";
import {NewsCard, PropertyListCard} from "@3um-group/atomic-sdk";
import {useEffect, useState} from "react";

function Dashboard() {
    const [newsArticles, setNewsArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(
                    'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=07f43684d91543c3a708314441a617d0'
                );
                const data = await response.json();
                setNewsArticles(data.articles);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching news:", error);
                setLoading(false);
            }
        };

        fetchNews();
    }, []);
    return (
        <>
            {/* <div className='h-500 w-full overflow-x-auto'> */}
            <PropertyCarousel />
            {/* </div> */}
            <div className="flex flex-col md:flex-row gap-6 justify-center w-full mb-7">
                <div className="flex-1 w-full max-w-3xl flex flex-col gap-6">
                    {properties.map((property) => (
                        <Link to={`/property-details/${property.id}`} key={property.id}>
                            <PropertyListCard
                                key={property.id}
                                badgeColors={{
                                    'Cash Only': 'bg-transparent text-red-500 border border-red-500',
                                    'No Buyers Premium': 'bg-transparent text-blue-500 border border-blue-500',
                                    'Open House': 'bg-transparent text-orange-500 border border-orange-500',
                                    'Reported Vacant': 'bg-transparent text-black border border-black'
                                }}
                                imageSrc={property.imageSrc}
                                imageAlt={property.imageAlt}
                                price={property.price}
                                description={property.description}
                                location={property.location}
                                badges={property.badges}
                                beds={property.beds}
                                baths={property.baths}
                                sqft={property.sqft}
                                className="w-full"
                                onRegister={() => {
                                    console.log("Register function not implemented");
                                } } />
                        </Link>
                    ))}
                </div>

                <div className="w-full md:w-1/4 flex flex-col gap-6">
                    {loading ? (
                        <p>Loading news...</p>
                    ) : (
                        newsArticles.slice(0, 4).map((article, index) => (
                            <NewsCard
                                key={index}
                                imageSrc={article.urlToImage || 'https://via.placeholder.com/150'}
                                title={article.title}
                                description={article.description}
                                date={new Date(article.publishedAt).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                                linkUrl={article.url}
                                className="w-full" />
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default Dashboard;
