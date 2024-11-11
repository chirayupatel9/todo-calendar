import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Theme } from '../types';

export default function ThemeToggle({ isDark, toggle }: Theme) {
  return (
    <button
      onClick={toggle}
      className={`p-2 rounded-lg transition-colors ${
        isDark 
          ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
          : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
      }`}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}