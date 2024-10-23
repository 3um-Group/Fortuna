import { useEffect, useState } from 'react';
import { NewsCard } from '@3um-group/atomic-sdk';

interface NewsFeedProps {
  numberOfArticles: number;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ numberOfArticles }) => {
  const [newsArticles, setNewsArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          'https://newsapi.org/v2/top-headlines?country=us&category=crypto&apiKey=07f43684d91543c3a708314441a617d0'
        );
        const data = await response.json();
        setNewsArticles(data.articles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="w-full md:w-1/4 flex flex-col gap-6 p-3">
      {loading ? (
        <p>Loading news...</p>
      ) : (
        newsArticles.slice(0, numberOfArticles).map((article, index) => (
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
            linkUrl="/article"
            className="w-full"
          />
        ))
      )}
    </div>
  );
};

export default NewsFeed;
