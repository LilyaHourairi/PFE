import React from 'react';
import { Category } from '../types';

interface CategoryCheckboxProps {
  category: Category;
  isSelected: boolean;
  onToggle: (categoryId: string) => void;
}

const CategoryCheckbox: React.FC<CategoryCheckboxProps> = ({ category, isSelected, onToggle }) => {
  const getBorderColor = () => {
    switch (category.color) {
      case 'blue': return 'border-blue-500';
      case 'purple': return 'border-purple-500';
      case 'green': return 'border-green-500';
      case 'orange': return 'border-orange-500';
      case 'red': return 'border-red-500';
      case 'indigo': return 'border-indigo-500';
      case 'teal': return 'border-teal-500';
      default: return 'border-gray-300';
    }
  };

  const getGradientBg = () => {
    if (!isSelected) return 'bg-white dark:bg-gray-800';
    
    switch (category.color) {
      case 'blue': return 'bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800';
      case 'purple': return 'bg-gradient-to-r from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800';
      case 'green': return 'bg-gradient-to-r from-green-50 to-white dark:from-green-900/20 dark:to-gray-800';
      case 'orange': return 'bg-gradient-to-r from-orange-50 to-white dark:from-orange-900/20 dark:to-gray-800';
      case 'red': return 'bg-gradient-to-r from-red-50 to-white dark:from-red-900/20 dark:to-gray-800';
      case 'indigo': return 'bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-900/20 dark:to-gray-800';
      case 'teal': return 'bg-gradient-to-r from-teal-50 to-white dark:from-teal-900/20 dark:to-gray-800';
      default: return 'bg-white dark:bg-gray-800';
    }
  };

  const getCheckboxColor = () => {
    switch (category.color) {
      case 'blue': return 'text-blue-600 focus:ring-blue-500';
      case 'purple': return 'text-purple-600 focus:ring-purple-500';
      case 'green': return 'text-green-600 focus:ring-green-500';
      case 'orange': return 'text-orange-600 focus:ring-orange-500';
      case 'red': return 'text-red-600 focus:ring-red-500';
      case 'indigo': return 'text-indigo-600 focus:ring-indigo-500';
      case 'teal': return 'text-teal-600 focus:ring-teal-500';
      default: return 'text-blue-600 focus:ring-blue-500';
    }
  };

  return (
    <div className={`rounded-lg shadow p-4 mb-3 transition-all duration-300 border-l-4 ${getBorderColor()} ${getGradientBg()}`}>
      <label className="flex items-start cursor-pointer">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggle(category.id)}
            className={`w-4 h-4 border-gray-300 rounded focus:ring-2 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 ${getCheckboxColor()}`}
          />
        </div>
        <div className="ml-3 text-sm">
          <span className="font-medium text-gray-800 dark:text-white">{category.name}</span>
          <p className="text-gray-600 dark:text-gray-300 mt-1">{category.description}</p>
        </div>
      </label>
    </div>
  );
};

export default CategoryCheckbox;