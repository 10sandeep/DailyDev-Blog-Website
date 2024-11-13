import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import ArticleCard from '../components/ArticleCard';
import { useArticles } from '../hooks/useArticles';
import { Loader2 } from 'lucide-react';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const { searchQuery } = useSearch();
  const query = searchParams.get('q') || searchQuery;
  const { articles, loading, error } = useArticles('all', 'latest');

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(query.toLowerCase()) ||
    article.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Search Results for "{query}"
      </h1>
      {error && (
        <div className="text-red-500 dark:text-red-400 text-center py-8">
          {error}
        </div>
      )}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : (
        <>
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400">
                No articles found matching your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard 
                  key={article.id} 
                  {...article}
                  onLikeUpdate={(id, likes) => console.log(`Article ${id} likes: ${likes}`)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}