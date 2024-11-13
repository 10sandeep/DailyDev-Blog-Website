import { useState, useEffect } from 'react';
import { api, Article } from '../services/api';

export function useArticles(category: string, sortBy: 'latest' | 'popular' | 'following') {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await api.getArticles(category === 'all' ? undefined : category);
        
        const sortedData = [...data].sort((a, b) => {
          if (sortBy === 'popular') return b.likes - a.likes;
          if (sortBy === 'following') return b.comments - a.comments;
          return 0;
        });
        
        setArticles(sortedData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category, sortBy]);

  return { articles, loading, error };
}