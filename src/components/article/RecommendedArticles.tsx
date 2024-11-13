import React from 'react';
import { useArticles } from '../../hooks/useArticles';
import { Loader2 } from 'lucide-react';

interface RecommendedArticlesProps {
  currentArticleId: string;
  onArticleClick: (id: string) => void;
}

export default function RecommendedArticles({ 
  currentArticleId, 
  onArticleClick 
}: RecommendedArticlesProps) {
  const { articles, loading, error } = useArticles('all', 'latest');
  
  const recommendedArticles = articles
    .filter(article => article.id !== currentArticleId)
    .slice(0, 5);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse flex space-x-4">
            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 dark:text-red-400 text-center py-4">
        {error}
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {recommendedArticles.map((article) => (
        <article
          key={article.id}
          onClick={() => onArticleClick(article.id)}
          className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex space-x-4">
            <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {article.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                {article.description}
              </p>
              <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                <span>{article.author.name}</span>
                <span className="mx-2">·</span>
                <span>{article.readTime} read</span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}