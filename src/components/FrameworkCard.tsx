import React from 'react';
import { Framework } from '../types';
import { ShieldCheck, Shield, ShieldAlert } from 'lucide-react';

interface FrameworkCardProps {
  framework: Framework;
  title: string;
  description: string;
  onSelect: (framework: Framework) => void;
}

const FrameworkCard: React.FC<FrameworkCardProps> = ({ framework, title, description, onSelect }) => {
  const getIcon = () => {
    switch (framework) {
      case 'SMSI':
        return <ShieldCheck className="w-12 h-12 text-blue-500" />;
      case 'SMCA':
        return <ShieldAlert className="w-12 h-12 text-purple-500" />;
      case 'NIST':
        return <Shield className="w-12 h-12 text-green-500" />;
    }
  };

  const getCardColor = () => {
    switch (framework) {
      case 'SMSI':
        return 'hover:border-blue-500 hover:shadow-blue-100 dark:hover:shadow-blue-900';
      case 'SMCA':
        return 'hover:border-purple-500 hover:shadow-purple-100 dark:hover:shadow-purple-900';
      case 'NIST':
        return 'hover:border-green-500 hover:shadow-green-100 dark:hover:shadow-green-900';
    }
  };

  const getGradient = () => {
    switch (framework) {
      case 'SMSI':
        return 'bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800';
      case 'SMCA':
        return 'bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800';
      case 'NIST':
        return 'bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800';
    }
  };

  return (
    <div 
      className={`rounded-xl shadow-lg p-6 border-2 border-transparent transition-all duration-300 hover:shadow-xl cursor-pointer ${getCardColor()} ${getGradient()}`}
      onClick={() => onSelect(framework)}
    >
      <div className="flex flex-col items-center text-center">
        {getIcon()}
        <h3 className="mt-4 text-xl font-bold text-gray-800 dark:text-white">{title}</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default FrameworkCard;