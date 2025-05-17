import React from 'react';
import Layout from '../components/Layout';
import AssessmentHistoryItem from '../components/AssessmentHistoryItem';
import { useAssessment } from '../context/AssessmentContext';
import { History } from 'lucide-react';

const HistoryPage: React.FC = () => {
  const { assessmentHistory } = useAssessment();
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <History size={24} className="text-indigo-600 dark:text-indigo-400 mr-3" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            Historique des évaluations
          </h1>
        </div>
        
        {assessmentHistory.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center border border-dashed border-gray-300 dark:border-gray-600">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Vous n'avez pas encore effectué d'évaluation.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Commencer une évaluation
            </button>
          </div>
        ) : (
          <div>
            {assessmentHistory
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map(assessment => (
                <AssessmentHistoryItem key={assessment.id} assessment={assessment} />
              ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HistoryPage;