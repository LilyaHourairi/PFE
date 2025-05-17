import React from 'react';
import { Assessment } from '../types';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle, Clock } from 'lucide-react';

interface AssessmentHistoryItemProps {
  assessment: Assessment;
}

const AssessmentHistoryItem: React.FC<AssessmentHistoryItemProps> = ({ assessment }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getGradientBg = () => {
    if (!assessment.completed) return 'bg-white dark:bg-gray-800';
    
    if (assessment.score && assessment.score <= 2) {
      return 'bg-gradient-to-r from-red-50 to-white dark:from-red-900/20 dark:to-gray-800';
    } else if (assessment.score && assessment.score <= 4) {
      return 'bg-gradient-to-r from-yellow-50 to-white dark:from-yellow-900/20 dark:to-gray-800';
    } else {
      return 'bg-gradient-to-r from-green-50 to-white dark:from-green-900/20 dark:to-gray-800';
    }
  };

  const getBorderColor = () => {
    if (!assessment.completed) return 'border-yellow-500';
    
    if (assessment.score && assessment.score <= 2) {
      return 'border-red-500';
    } else if (assessment.score && assessment.score <= 4) {
      return 'border-yellow-500';
    } else {
      return 'border-green-500';
    }
  };

  return (
    <div className={`rounded-lg shadow-md p-4 mb-4 ${getGradientBg()} border-l-4 ${getBorderColor()} transition-all duration-300 hover:shadow-lg`}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Évaluation {assessment.framework}
            {assessment.family && ` - ${assessment.family}`}
          </h3>
          <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar size={16} className="mr-1" />
            <span>{formatDate(assessment.date)}</span>
          </div>
        </div>
        <div className="flex items-center">
          {assessment.completed ? (
            <>
              <CheckCircle size={18} className="text-green-500 mr-2" />
              <span className="text-green-500 font-medium">Complété</span>
            </>
          ) : (
            <>
              <Clock size={18} className="text-yellow-500 mr-2" />
              <span className="text-yellow-500 font-medium">En cours</span>
            </>
          )}
        </div>
      </div>
      
      {assessment.completed && assessment.score && (
        <div className="mt-3 flex items-center">
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
            Score: {assessment.score.toFixed(1)}/5
          </div>
        </div>
      )}
      
      <div className="mt-4">
        {assessment.completed ? (
          <Link 
            to={`/results/${assessment.id}`}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Voir les résultats
          </Link>
        ) : (
          <Link 
            to={`/assessment/continue/${assessment.id}`}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Continuer l'évaluation
          </Link>
        )}
      </div>
    </div>
  );
};

export default AssessmentHistoryItem;