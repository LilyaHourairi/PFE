


import React from 'react';
import { Result } from '../types';

interface ResultCardProps {
  result: Result;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const getScoreColor = () => {
    if (result.score <= 2) return 'text-red-500';
    if (result.score <= 4) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getGradientBg = () => {
    if (result.score <= 2) return 'bg-gradient-to-br from-red-50 to-white dark:from-red-900/10 dark:to-gray-800';
    if (result.score <= 4) return 'bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/10 dark:to-gray-800';
    return 'bg-gradient-to-br from-green-50 to-white dark:from-green-900/10 dark:to-gray-800';
  };

  const getBorderColor = () => {
    if (result.score <= 2) return 'border-red-500';
    if (result.score <= 4) return 'border-yellow-500';
    return 'border-green-500';
  };

  return (
    <div className={`rounded-xl shadow-lg p-6 mb-6 ${getGradientBg()} border-t-4 ${getBorderColor()}`}>
      {/* 💡 Catégorie */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-white text-sm font-semibold rounded-full">
          {result.categoryId.toUpperCase()}
        </span>
      </div>

      {/* 📝 Liste des questions */}
      <div className="space-y-3 mb-4">
        {result.questions?.map((q, idx) => (
          <div key={idx} className="text-gray-800 dark:text-white bg-white dark:bg-gray-700 rounded-md p-3 shadow-sm border border-gray-200 dark:border-gray-600">
            {q}
          </div>
        ))}
      </div>

      {/* ✅ Score de la catégorie */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Score moyen de la catégorie :</div>
        <div className={`text-2xl font-bold ${getScoreColor()}`}>
          {result.score.toFixed(1)}/5
        </div>
      </div>

      {/* 💡 Recommandations */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-2">Recommandations :</h4>
        <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
          {result.recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultCard;
