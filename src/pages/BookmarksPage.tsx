import React from 'react';
import { useArticles } from '../hooks/useArticles';
import ArticleCard from '../components/ArticleCard';
import { Loader2 } from 'lucide-react';

export default function BookmarksPage() {
  const { articles, loading, error } = useArticles('all', 'latest');
  
  // In a real app, we would filter for bookmarked articles
  const bookmarkedArticles = articles.filter(() => Math.random() > 0.5);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Your Bookmarks
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
      ) : bookmarkedArticles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 dark:text-gray-400">
            No bookmarked articles yet. Start exploring and save your favorite articles!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedArticles.map((article) => (
            <ArticleCard 
              key={article.id} 
              {...article}
              onLikeUpdate={(id, likes) => console.log(`Article ${id} likes: ${likes}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}