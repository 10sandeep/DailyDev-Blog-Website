import React from 'react';
import { Article } from '../../services/api';
import { formatDate } from '../../utils/dateUtils';

interface ArticleContentProps {
  article: Article;
}

export default function ArticleContent({ article }: ArticleContentProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          {article.title}
        </h1>
        
        <div className="flex items-center space-x-4">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-12 h-12 rounded-full ring-2 ring-white dark:ring-gray-800"
          />
          <div>
            <p className="text-gray-900 dark:text-white font-medium">
              {article.author.name}
            </p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span>{formatDate(new Date())}</span>
              <span className="mx-2">·</span>
              <span>{article.readTime} read</span>
              <span className="mx-2">·</span>
              <span className="text-blue-600 dark:text-blue-400">{article.category}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mb-8 group">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-64 sm:h-96 object-cover rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div 
        className="text-gray-800 dark:text-gray-200 leading-relaxed space-y-6 animate-fade-in"
        dangerouslySetInnerHTML={{ 
          __html: article.content || 
            `<p>${article.description}</p>
             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
             <h2>Key Takeaways</h2>
             <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
             <blockquote>
               <p>Innovation distinguishes between a leader and a follower.</p>
             </blockquote>
             <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>`
        }}
      />
    </div>
  );
}