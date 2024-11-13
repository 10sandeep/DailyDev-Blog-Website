import React, { useState, useEffect, useCallback } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const scrolled = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = (scrolled / height) * 100;
    setProgress(Math.min(100, Math.max(0, percentage)));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, [updateProgress]);

  return (
    <div className="fixed top-16 left-64 right-0 h-1 bg-gray-200 dark:bg-gray-700 z-50">
      <div
        className="h-full bg-blue-600 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}