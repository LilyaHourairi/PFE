

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import QuestionForm from '../components/QuestionForm';
import ProgressBar from '../components/ProgressBar';
import { useAssessment } from '../context/AssessmentContext';
import { Result } from '../types';

const AssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentAssessment, getCurrentQuestions, getCompletionPercentage, completeAssessment } = useAssessment();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    if (!currentAssessment) navigate('/');
  }, [currentAssessment, navigate]);

  if (!currentAssessment) return null;

  const questions = getCurrentQuestions();

  /* const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Simuler le calcul des résultats basés sur l'évaluation des réponses
      const overallScore = 3.5; // ⚠️ À remplacer par un vrai calcul
      const results: Result[] = questions.map((q, index) => ({
        categoryId: q.category,
        categoryName: q.text,
        score: Math.random() * 5, // ⚠️ Simulation d'un score entre 0 et 5
        recommendations: ["Améliorer la documentation", "Optimiser les contrôles de sécurité"]
      }));

      completeAssessment(overallScore, results);
      navigate('/results');
    }
  }; */

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const answers = currentAssessment.answers;
    
      // Grouper par catégorie
      //const scoresByCategory: { [categoryId: string]: { scores: number[], categoryName: string } } = {};
      
      const scoresByCategory: {
        [categoryId: string]: {
          scores: ScoredQuestion[];
          categoryName: string;  //1
        };
      } = {};

      type ScoredQuestion = {
        score: number;
        questionText: string;
      };

      questions.forEach(q => {
        const answer = answers.find(a => a.questionId === q.id);
        if (!answer) return;
  
        if (!scoresByCategory[q.category]) {
          scoresByCategory[q.category] = {
            scores: [],
            //categoryName: q.text // ou autre nom lisible
            categoryName: q.category, // ou garde q.text si plus explicite  2
    
          };
        }
       // scoresByCategory[q.category].scores.push(answer.maturityLevel);

      scoresByCategory[q.category].scores.push({
        score: answer.maturityLevel,
        questionText: q.text
      });
      }); 
      
      // Calcul des scores par catégorie
      /* const results: Result[] = Object.entries(scoresByCategory).map(([catId, data]) => {
        const avg = data.scores.reduce((a, b) => a + b, 0) / data.scores.length;
        return {
          categoryId: catId,
          categoryName: data.categoryName,
          score: parseFloat(avg.toFixed(2)), // moyenne sur 5
          recommendations: ["Améliorer les pratiques dans cette catégorie"] // optionnel
        };
      });
   */

      const results: Result[] = Object.entries(scoresByCategory).map(([catId, data]) => {
        const avg = data.scores.reduce((a, b) => a + b.score, 0) / data.scores.length;
        const questionTexts = data.scores.map(s => s.questionText); // Ajoute ceci
        return {
          categoryId: catId,
          //categoryName: catId, // ou un mapping plus lisible si tu veux 3
          categoryName: data.categoryName,  
          score: parseFloat(avg.toFixed(2)),
          recommendations: ["Améliorer les pratiques dans cette catégorie"],
          questions: questionTexts // ✅ à ajouter au type
        };
      });
      
      // Score global : moyenne des moyennes
      const overallScore = results.reduce((a, b) => a + b.score, 0) / results.length;
      
      console.log("Réponses enregistrées :", currentAssessment.answers);
      completeAssessment(overallScore, results);
      navigate('/results');
    }
  };
  
  const completionPercentage = getCompletionPercentage();

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Évaluation {currentAssessment.framework}
            {currentAssessment.families && ` - ${currentAssessment.families.join(', ')}`}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Répondez aux questions suivantes pour évaluer la maturité de votre organisation.
          </p>
        </div>

        <div className="mb-6">
          <ProgressBar percentage={completionPercentage} label="Progression" />
        </div>

        <QuestionForm 
          question={questions[currentQuestionIndex]} 
          onNext={handleNext}
          isLast={currentQuestionIndex === questions.length - 1}
          userId={1}
          assessmentId={currentAssessment.id}
        />
      </div>
    </Layout>
  );
};

export default AssessmentPage;

