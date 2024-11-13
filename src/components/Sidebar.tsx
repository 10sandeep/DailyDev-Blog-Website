import React from 'react';
import { Home, Compass, Bookmark, Bell, Settings, Newspaper, PenTool, TrendingUp, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navigation = [
  { name: 'Home', icon: Home, path: '/' },
  { name: 'Explore', icon: Compass, path: '/explore' },
  { name: 'Trending', icon: TrendingUp, path: '/trending' },
  { name: 'Write', icon: PenTool, path: '/write' },
  { name: 'Bookmarks', icon: Bookmark, path: '/bookmarks' },
  { name: 'Following', icon: Users, path: '/following' },
  { name: 'Notifications', icon: Bell, path: '/notifications' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 h-screen fixed left-0 top-0 border-r border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <NavLink to="/" className="flex items-center space-x-2">
          <Newspaper className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-blue-600">DevDaily</h1>
        </NavLink>
      </div>
      <nav className="mt-6">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex items-center px-6 py-3 text-gray-700 dark:text-gray-300
              hover:bg-blue-50 dark:hover:bg-gray-700
              hover:text-blue-600 dark:hover:text-blue-400
              transition-colors
              ${isActive ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 border-r-4 border-blue-600' : ''}
            `}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="absolute bottom-8 left-0 right-0 px-6">
        <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Write for DevDaily
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
            Share your knowledge with our growing developer community.
          </p>
          <NavLink
            to="/write"
            className="block text-center py-2 px-4 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Start Writing
          </NavLink>
        </div>
      </div>
    </div>
  );
}