import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import ReadingProgress from './components/ReadingProgress';
import { ThemeProvider } from './context/ThemeContext';
import { SearchProvider } from './context/SearchContext';
import { ProfileProvider } from './context/ProfileContext';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import TrendingPage from './pages/TrendingPage';
import WritePage from './pages/WritePage';
import BookmarksPage from './pages/BookmarksPage';
import FollowingPage from './pages/FollowingPage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';
import SearchPage from './pages/SearchPage';
import ArticlePage from './pages/ArticlePage';
import EditProfilePage from './pages/EditProfilePage';

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <ThemeProvider>
          <SearchProvider>
            <ProfileProvider>
              <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
                <Sidebar />
                <TopBar />
                <ReadingProgress />
                <main className="ml-64 pt-16">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/trending" element={<TrendingPage />} />
                    <Route path="/write" element={<WritePage />} />
                    <Route path="/bookmarks" element={<BookmarksPage />} />
                    <Route path="/following" element={<FollowingPage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/settings/profile" element={<EditProfilePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/article/:id" element={<ArticlePage />} />
                  </Routes>
                </main>
              </div>
            </ProfileProvider>
          </SearchProvider>
        </ThemeProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;