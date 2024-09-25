import React, { useEffect } from 'react';
// import { Image } from '@3um-group/atomic-sdk';
import { useParams } from 'react-router-dom';
import PropertyCarousel from '../components/PropertyDetails/PropertyCarousel';

const Article: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // Scroll to top when component mounts or property ID changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    return (

        <div className="container mx-auto p-4">

            <header className="mb-6">
                <h1 className="text-4xl font-bold mb-2">
                    Stock market today: S&P 500, Dow hit fresh records, China stocks soar on new stimulus
                </h1>
                <div className="badge badge-primary">World News</div>
            </header>
    
            {/* Article Image */}
            <div className="mb-6">
                <img
                    className="rounded-xl w-full object-cover"
                    src="https://via.placeholder.com/1200x600"
                    alt="News Banner"
                />
            </div>
    
            {/* Article Body */}
            <div className="prose lg:prose-xl">
                <p>US stocks rose modestly on Tuesday, with the S&P 500 (^GSPC) and Dow Jones Industrial (^DJI) average notching record closes. Investors digested China's launch of aggressive stimulus and a notable dip in US consumer sentiment.</p>
                <p className='mt-6'>The tech-heavy Nasdaq Composite (^IXIC) rose 0.56%, leading the day's gains, while the S&P 500 (^GSPC) was up 0.25%, hitting its 41st record close of the year at 5,733.03. Meanwhile, the Dow Jones Industrial Average (^DJI) rose about 0.1% to close at a record 42,208.41.</p>
                <p className='mt-6'>Stocks recovered from a dip into negative territory following a new consumer confidence index reading. The Conference Board's index fell to 98.7 in September, below the 105.6 seen in August and lower than what the 104 economists surveyed by Bloomberg expected.</p>
                <p className='mt-6'>But Wall Street's September rally continued. The Fed's jumbo rate cut last week kicked off the rally, and on Monday, several policymakers hinted the door is open for more big moves. On Tuesday, Fed governor Michelle Bowman explained she dissented to last week's half percentage point interest rate cut because "upside risks to inflation remain prominent."</p>
                <p className='mt-6'>Also boosting the mood was China's launch of a raft of stimulus measures, its biggest since the pandemic. Global stocks and oil (CL=F, BZ=F) rallied after the PBOC's move to revive a slowing economy and support markets. US-listed stocks of Chinese e-commerce companies also popped on the news, led by a nearly 14% surge in shares of JD.com (JD).</p>
            </div>
    
            {/* Author Info */}
            <div className="flex items-center mt-6">
                <img
                    src="https://via.placeholder.com/100"
                    alt="Author"
                    className="rounded-full w-12 h-12 mr-4"
                />
                <div>
                    <p className="font-semibold">Karen Friar and Josh Schafer</p>
                    <p className="text-sm text-gray-500">Updated Tue, September 24, 2024 at 4:16 PM EDT</p>
                </div>
            </div>
    
            {/* Tags */}
            <div className="mt-6">
                <div className="flex space-x-2">
                    <div className="badge badge-outline">Politics</div>
                    <div className="badge badge-outline">Economy</div>
                    <div className="badge badge-outline">World News</div>
                </div>
            </div>

            <div className="mt-6 mb-12 h-500 w-full">
                <PropertyCarousel />
            </div>

        </div>
    );
};

export default Article;
