import React, { useState } from 'react';
import { Bookmark, Heart, MessageCircle, Share2 } from 'lucide-react';
import { api, Article } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface ArticleCardProps extends Article {
  onLikeUpdate?: (id: string, newLikes: number) => void;
}

export default function ArticleCard({
  id,
  title,
  description,
  image,
  author,
  category,
  readTime,
  likes: initialLikes,
  comments,
  onLikeUpdate
}: ArticleCardProps) {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isUpdating) return;
    
    try {
      setIsUpdating(true);
      const newLikes = await api.updateArticleLikes(id, !isLiked);
      setLikes(newLikes);
      setIsLiked(!isLiked);
      onLikeUpdate?.(id, newLikes);
    } catch (error) {
      console.error('Failed to update likes:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div 
      onClick={() => navigate(`/article/${id}`)}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <div className="relative group">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        <button
          onClick={handleBookmark}
          className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors transform hover:scale-105"
        >
          <Bookmark
            className={`w-4 h-4 ${
              isBookmarked ? 'text-blue-600 fill-current' : 'text-gray-700 dark:text-gray-300'
            }`}
          />
        </button>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium">
            {category}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{readTime} read</span>
        </div>
        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={author.avatar} 
              alt={author.name} 
              className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-gray-800" 
            />
            <span className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
              {author.name}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              disabled={isUpdating}
              className={`flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors ${
                isUpdating ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isLiked ? 'text-red-500 fill-current' : ''
                }`}
              />
              <span className="text-sm">{likes}</span>
            </button>
            <button 
              onClick={(e) => e.stopPropagation()}
              className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{comments}</span>
            </button>
            <button 
              onClick={(e) => e.stopPropagation()}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}