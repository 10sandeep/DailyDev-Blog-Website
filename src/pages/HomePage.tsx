import React, { useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import CategoryFilter from '../components/CategoryFilter';
import { useArticles } from '../hooks/useArticles';
import { Loader2 } from 'lucide-react';

const categories = ['React', 'Web Dev', 'GraphQL', 'TypeScript', 'Node.js'];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'following'>('latest');
  const { articles, loading, error } = useArticles(selectedCategory, sortBy);

  const handleLikeUpdate = (id: string, newLikes: number) => {
    console.log(`Article ${id} likes updated to ${newLikes}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Latest Articles
        </h1>
        <div className="flex space-x-2">
          {(['latest', 'popular', 'following'] as const).map((sort) => (
            <button
              key={sort}
              onClick={() => setSortBy(sort)}
              className={`px-4 py-2 rounded-lg transition-all transform hover:scale-105 ${
                sortBy === sort
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {sort.charAt(0).toUpperCase() + sort.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard 
              key={article.id} 
              {...article} 
              onLikeUpdate={handleLikeUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}