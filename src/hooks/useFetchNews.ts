import { useState, useEffect } from 'react';

const useFetchNews = (apiKey: string) => {
    const [newsArticles, setNewsArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(
                    `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`
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
    }, [apiKey]);

    return { newsArticles, loading };
};

export default useFetchNews;
