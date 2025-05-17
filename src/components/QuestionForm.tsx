
import React, { useState } from 'react';
import { Question } from '../types';
import { useAssessment } from '../context/AssessmentContext';
import { evaluateResponse } from '../services/api'; // Importation de l'API
interface QuestionFormProps {
  question: Question;
  onNext: () => void;
  isLast: boolean;
  userId: number;           
  assessmentId: string | null; 
}

const QuestionForm: React.FC<QuestionFormProps> = ({ 
  question, 
  onNext, 
  isLast, 
  userId, 
  assessmentId 
}) => {
  const { saveAnswer } = useAssessment();
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Nouveaux états pour afficher le résultat de l'évaluation
  const [assignedLevel, setAssignedLevel] = useState<number | null>(null);
  const [similarityScore, setSimilarityScore] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!response.trim()) {
      setError('Veuillez fournir une réponse');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      // Envoie la réponse à l'API avec userId et assessmentId
      const result = await evaluateResponse(question.id, response, userId, assessmentId);

      // Stocke les résultats
      setAssignedLevel(result.assigned_level);
      setSimilarityScore(result.similarity_score);
      
      // Sauvegarde la réponse de l'utilisateur pour la progression
/*       saveAnswer(question.id, response);
 */      
      saveAnswer(question.id, response, result.assigned_level, result.similarity_score); 

      // Passe à la question suivante après un délai (optionnel)
      setTimeout(() => {
        setResponse('');
        setAssignedLevel(null);
        setSimilarityScore(null);
        onNext();
      }, 2000); 
  
    } catch (err) {
      console.error("Erreur d'évaluation :", err);
      setError("Erreur lors de l'évaluation de votre réponse.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 animate-fadeIn border-t-4 border-indigo-500">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{question.text}</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="response" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Votre réponse:
          </label>
          <textarea
            id="response"
            rows={4}
            className="w-full px-3 py-2 text-gray-700 dark:text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 dark:border-gray-600"
            placeholder="Décrivez votre situation actuelle..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          ></textarea>
          {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>
        
        {assignedLevel !== null && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-md font-medium text-gray-700 dark:text-gray-300">
              <strong>Niveau de maturité assigné :</strong> {assignedLevel}
            </p>
            <p className="text-md font-medium text-gray-700 dark:text-gray-300">
              <strong>Score de similarité :</strong> {similarityScore?.toFixed(2)}
            </p>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            disabled={loading}
          >
            {loading ? "Évaluation..." : isLast ? 'Terminer' : 'Suivant'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;


