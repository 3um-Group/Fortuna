import { useEffect, useState } from 'react';
import { NewsCard } from '@3um-group/atomic-sdk';

interface NewsFeedProps {
  numberOfArticles: number;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ numberOfArticles }) => {
  const [newsArticles, setNewsArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=07f43684d91543c3a708314441a617d0',
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'Fortuna/1.01'
            }
          }
        );
        
        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
        }
        
        const data = await response.json();
        
        setNewsArticles(data.articles || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full md:w-1/4 flex flex-col gap-6 p-3">
      {newsArticles.slice(0, numberOfArticles).map((article, index) => (
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
      ))}
    </div>
  );
};

export default NewsFeed;
