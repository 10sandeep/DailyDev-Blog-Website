import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Bookmark, Heart, MessageCircle } from 'lucide-react';
import { api, Article } from '../services/api';
import RecommendedArticles from '../components/article/RecommendedArticles';
import ArticleContent from '../components/article/ArticleContent';
import ArticleActions from '../components/article/ArticleActions';
import { formatDate } from '../utils/dateUtils';

export default function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        if (id) {
          const data = await api.getArticle(id);
          if (data) {
            setArticle(data);
            setError(null);
          } else {
            setError('Article not found');
          }
        }
      } catch (err) {
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse space-y-8 w-full max-w-3xl px-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Article Content */}
          <article className="lg:col-span-8 space-y-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to articles
            </button>

            <ArticleContent article={article} />
            
            <ArticleActions article={article} />
          </article>

          {/* Sidebar for Recommended Articles */}
          <aside className="mt-8 lg:mt-0 lg:col-span-4">
            <div className="sticky top-24 transition-transform duration-300 ease-in-out">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  More Articles Like This
                </h2>
                <RecommendedArticles 
                  currentArticleId={article.id} 
                  onArticleClick={(articleId) => {
                    navigate(`/article/${articleId}`);
                  }}
                />
              </div>
            </div>
          </aside>

          {/* Mobile Sidebar Toggle */}
          <div className="fixed bottom-4 right-4 lg:hidden">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Sidebar */}
          <div
            className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${
              showSidebar ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="h-full overflow-y-auto">
              <div className="p-6">
                <button
                  onClick={() => setShowSidebar(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  More Articles
                </h2>
                <RecommendedArticles 
                  currentArticleId={article.id}
                  onArticleClick={(articleId) => {
                    navigate(`/article/${articleId}`);
                    setShowSidebar(false);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}