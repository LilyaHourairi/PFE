import React from 'react';

interface ProgressBarProps {
  percentage: number;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, label }) => {
  const getProgressColor = () => {
    if (percentage < 30) return 'bg-blue-600';
    if (percentage < 70) return 'bg-indigo-600';
    return 'bg-purple-600';
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{percentage}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div 
          className={`h-2.5 rounded-full transition-all duration-500 ease-out ${getProgressColor()}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;