import React from 'react';
import { NISTFamily } from '../types';
import { ShieldCheck, HardDrive, AlertTriangle, Users, Database, Bell, Search, Shield, Eye, MessageSquare, RefreshCw } from 'lucide-react';

interface FamilyCardProps {
  family: NISTFamily;
  isSelected: boolean;
  onToggle: (family: NISTFamily) => void;
}

const FamilyCard: React.FC<FamilyCardProps> = ({ family, isSelected, onToggle }) => {
  const getIcon = () => {
    switch (family) {
      case 'Gouverner':
        return <ShieldCheck className="w-10 h-10 text-green-500" />;
      case 'Identifier':
        return <Search className="w-10 h-10 text-blue-500" />;
      case 'Protéger':
        return <Shield className="w-10 h-10 text-purple-500" />;
      case 'Détecter':
        return <Eye className="w-10 h-10 text-yellow-500" />;
      case 'Répondre':
        return <MessageSquare className="w-10 h-10 text-red-500" />;
      case 'Récupérer':
        return <RefreshCw className="w-10 h-10 text-teal-500" />;
      default:
        return <Database className="w-10 h-10 text-gray-500" />;
    }
  };

  const getBorderColor = () => {
    switch (family) {
      case 'Gouverner': return 'border-green-500';
      case 'Identifier': return 'border-blue-500';
      case 'Protéger': return 'border-purple-500';
      case 'Détecter': return 'border-yellow-500';
      case 'Répondre': return 'border-red-500';
      case 'Récupérer': return 'border-teal-500';
      default: return 'border-gray-300';
    }
  };

  const getGradientBg = () => {
    if (!isSelected) return 'bg-white dark:bg-gray-800';
    
    switch (family) {
      case 'Gouverner': return 'bg-gradient-to-r from-green-50 to-white dark:from-green-900/20 dark:to-gray-800';
      case 'Identifier': return 'bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800';
      case 'Protéger': return 'bg-gradient-to-r from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800';
      case 'Détecter': return 'bg-gradient-to-r from-yellow-50 to-white dark:from-yellow-900/20 dark:to-gray-800';
      case 'Répondre': return 'bg-gradient-to-r from-red-50 to-white dark:from-red-900/20 dark:to-gray-800';
      case 'Récupérer': return 'bg-gradient-to-r from-teal-50 to-white dark:from-teal-900/20 dark:to-gray-800';
      default: return 'bg-white dark:bg-gray-800';
    }
  };

  return (
    <div 
      className={`rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-all duration-300 border-l-4 ${getBorderColor()} ${getGradientBg()}`}
      onClick={() => onToggle(family)}
    >
      <div className="flex items-center">
        <div className="mr-4">
          {getIcon()}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{family}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Évaluez la maturité de votre capacité à {family.toLowerCase()}
          </p>
        </div>
        {isSelected && (
          <div className="ml-auto">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyCard;