'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('studiospace_theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setThemeState(savedTheme);
      applyThemeToHTML(savedTheme);
    } else {
      setThemeState('dark');
      applyThemeToHTML('dark');
    }
  }, []);

  const applyThemeToHTML = (newTheme) => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (newTheme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
      }
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setThemeState(nextTheme);
    localStorage.setItem('studiospace_theme', nextTheme);
    applyThemeToHTML(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
