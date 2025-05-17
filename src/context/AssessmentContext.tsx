import { createContext, useContext, useState, ReactNode } from 'react';
import { Result, Assessment, AssessmentResult, Framework, NISTFamily, Question } from '../types';
import { QUESTIONS } from '../data/frameworks';


/* interface AssessmentContextType {
  currentAssessment: Assessment | null;
  assessmentHistory: Assessment[];
  assessmentResults: AssessmentResult[];
  startAssessment: (framework: Framework, families?: NISTFamily[], categories?: string[]) => void;
  saveAnswer: (qid: string, response: string) => void;
  completeAssessment: (overallScore: number, results: Result[]) => void;
  getCurrentQuestions: () => Question[];
  getCompletionPercentage: () => number;
} */

  interface AssessmentContextType {
    currentAssessment: Assessment | null;
    assessmentHistory: Assessment[];
    assessmentResults: AssessmentResult[];
    startAssessment: (framework: Framework, families?: NISTFamily[], categories?: string[]) => void;
    saveAnswer: (qid: string, response: string, maturityLevel: number, similarityScore: number) => void; // ✅ Correction ici
    completeAssessment: (overallScore: number, results: Result[]) => void;
    getCurrentQuestions: () => Question[];
    getCompletionPercentage: () => number;
  }
  

const AssessmentContext = createContext<AssessmentContextType | null>(null);
export const useAssessment = () => useContext(AssessmentContext)!;

export const AssessmentProvider = ({ children }: { children: ReactNode }) => {
  const [currentAssessment, setCurrentAssessment] = useState<Assessment | null>(null);
  const [assessmentHistory, setAssessmentHistory] = useState<Assessment[]>([]);
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResult[]>([]);

  const startAssessment = (framework: Framework, families?: NISTFamily[], categories?: string[]) => {
    setCurrentAssessment({
      id: Date.now().toString(),
      framework,
      families,
      categories,
      answers: [],
      date: new Date(),
      completed: false
    });
  };

  /* const saveAnswer = (qid: string, response: string) => {
    setCurrentAssessment(prev => prev && ({
      ...prev,
      answers: [...prev.answers, { questionId: qid, response }]
    }));
  }; */

  const saveAnswer = (qid: string, response: string, maturityLevel: number, similarityScore: number) => {
    setCurrentAssessment(prev => prev && ({
      ...prev,
      answers: [...prev.answers, { questionId: qid, response, maturityLevel, similarityScore }]
    }));
  };
  

  const completeAssessment = (overallScore: number, results: Result[]) => {
    if (!currentAssessment) return;

    const newResult: AssessmentResult = {
      overallScore,
      results,
      date: new Date(),
      framework: currentAssessment.framework,
      families: currentAssessment.families,
      categories: currentAssessment.categories,
    };

    setAssessmentHistory(prev => [...prev, { ...currentAssessment, completed: true }]);
    setAssessmentResults([newResult]); // Stocke les résultats
    setCurrentAssessment(null);
  };

  const getCurrentQuestions = () => {
    if (!currentAssessment) return [];
    if (currentAssessment.framework === 'NIST' && currentAssessment.families) {
      return QUESTIONS.filter(q => currentAssessment.families?.includes(q.family!));
    } else {
      return QUESTIONS.filter(q => currentAssessment.categories?.includes(q.category));
    }
  };

  const getCompletionPercentage = () => {
    if (!currentAssessment) return 0;
    return Math.floor((currentAssessment.answers.length / getCurrentQuestions().length) * 100);
  };

  return (
    <AssessmentContext.Provider value={{
      currentAssessment,
      assessmentHistory,
      assessmentResults,
      startAssessment,
      saveAnswer, // ✅ correspond à la version à 4 arguments
      completeAssessment,
      getCurrentQuestions,
      getCompletionPercentage
    }}>
    
      {children}
    </AssessmentContext.Provider>
  );
};







