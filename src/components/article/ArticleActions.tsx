import React, { useState } from 'react';
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';
import { Article } from '../../services/api';

interface ArticleActionsProps {
  article: Article;
}

export default function ArticleActions({ article }: ArticleActionsProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(article.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: article.title,
        text: article.description,
        url: window.location.href,
      });
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  return (
    <div className="flex items-center justify-between border-t border-b border-gray-200 dark:border-gray-700 py-4 my-8">
      <div className="flex items-center space-x-6">
        <button
          onClick={handleLike}
          className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
        >
          <Heart
            className={`w-6 h-6 ${
              isLiked ? 'fill-current text-red-500' : ''
            }`}
          />
          <span>{likes}</span>
        </button>
        
        <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
          <MessageCircle className="w-6 h-6" />
          <span>{article.comments}</span>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors ${
            isBookmarked ? 'text-blue-500' : ''
          }`}
        >
          <Bookmark className={`w-6 h-6 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
        
        <button
          onClick={handleShare}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          <Share2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}