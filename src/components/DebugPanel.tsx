import React from 'react';
import { useAssessment } from '../context/AssessmentContext';
import { QUESTIONS } from '../data/frameworks';

const DebugPanel: React.FC = () => {
  const { assessmentHistory } = useAssessment();

  const lastAssessment = assessmentHistory.length > 0 ? assessmentHistory[assessmentHistory.length - 1] : null;

  if (!lastAssessment) return null;

  const relevantQuestions = QUESTIONS.filter(q => {
    if (lastAssessment.framework === 'NIST' && lastAssessment.families) {
      return lastAssessment.families.includes(q.family!);
    } else if (lastAssessment.categories) {
      return lastAssessment.categories.includes(q.category);
    }
    return false;
  });

  return (
    <div className="mt-10 p-4 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-600">
      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">🛠 DebugPanel</h3>
      
      <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-1">Questions filtrées ({relevantQuestions.length}) :</h4>
      <ul className="mb-4 text-sm text-gray-700 dark:text-gray-300 list-disc pl-4">
        {relevantQuestions.map((q, i) => (
          <li key={i}>
            <strong>{q.id}</strong> — {q.text} [{q.category}]
          </li>
        ))}
      </ul>

      <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-1">Réponses utilisateur ({lastAssessment.answers.length}) :</h4>
      <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc pl-4">
        {lastAssessment.answers.map((a, i) => (
          <li key={i}>
            <strong>{a.questionId}</strong> — niveau: {a.maturityLevel}, similarité: {a.similarityScore.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DebugPanel;
