

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ResultCard from '../components/ResultCard';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useAssessment } from '../context/AssessmentContext';
//import { Download, Home } from 'lucide-react';
import { AssessmentResult } from '../types'; // ✅ Import du bon type
import DebugPanel from '../components/DebugPanel'; // en haut du fichier



const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { assessmentResults } = useAssessment(); // ✅ Correct maintenant
  
  // Récupère le dernier résultat
  const result: AssessmentResult | null = assessmentResults.length > 0 
    ? assessmentResults[assessmentResults.length - 1] 
    : null;

  if (!result) {
    navigate('/');
    return null;
  }
  
  const getScoreLabel = (score: number) => {
    if (score <= 2) return 'Basique';
    if (score <= 3) return 'En développement';
    if (score <= 4) return 'Établi';
    return 'Optimisé';
  };

  const getScoreGradient = (score: number) => {
    if (score <= 2) return 'bg-gradient-to-r from-red-500 to-red-600';
    if (score <= 3) return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    if (score <= 4) return 'bg-gradient-to-r from-blue-500 to-indigo-500';
    return 'bg-gradient-to-r from-green-500 to-emerald-500';
  };
  
  const exportToPDF = async () => {
    const element = document.getElementById('results-container');
    if (!element) return;
    
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    
    pdf.addImage(imgData, 'PNG', imgX, 20, imgWidth * ratio, imgHeight * ratio);
    pdf.save(`Rapport_${result.framework}_${new Date().toISOString().slice(0, 10)}.pdf`);
  };
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto" id="results-container">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Résultats de l'évaluation
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {result.framework} | {new Date(result.date).toLocaleDateString('fr-FR')}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Score global de maturité
          </h2>
          <div className="flex justify-center items-center mb-2">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center ${getScoreGradient(result.overallScore)} text-white text-4xl font-bold`}>
              {result.overallScore.toFixed(1)}
            </div>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Niveau: <span className="font-medium">{getScoreLabel(result.overallScore)}</span>
          </p>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Résultats détaillés
        </h2>
        
        <button
      onClick={exportToPDF} // ✅ Ajouté pour que la fonction soit utilisée
      className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors mb-6"
          >
         Exporter en PDF
        </button>
        {result.results.map((categoryResult: any, index: number) => (
          <ResultCard key={index} result={categoryResult} />
        ))}

    <DebugPanel />
      </div>
    </Layout>
  );
};

export default ResultsPage;



