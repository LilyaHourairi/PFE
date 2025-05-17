import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import FamilyCard from '../components/FamilyCard';
import { NISTFamily } from '../types';
import { NIST_FAMILIES } from '../data/frameworks';
import { useAssessment } from '../context/AssessmentContext';
import { CheckCircle } from 'lucide-react';

const SelectFamilyPage: React.FC = () => {
  const navigate = useNavigate();
  const { startAssessment } = useAssessment();
  const [selectedFamilies, setSelectedFamilies] = useState<NISTFamily[]>([]);
  
  const handleToggleFamily = (family: NISTFamily) => {
    setSelectedFamilies(prev => {
      if (prev.includes(family)) {
        return prev.filter(f => f !== family);
      } else {
        return [...prev, family];
      }
    });
  };
  
  const handleSelectAll = () => {
    if (selectedFamilies.length === NIST_FAMILIES.length) {
      setSelectedFamilies([]);
    } else {
      setSelectedFamilies([...NIST_FAMILIES]);
    }
  };
  
/*   const handleStartAssessment = () => {
    if (selectedFamilies.length === 0) {
      alert('Veuillez sélectionner au moins une famille');
      return;
    }
    
    // Pour simplifier, nous utilisons la première famille sélectionnée
    // Dans une implémentation complète, il faudrait gérer plusieurs familles
    startAssessment('NIST', undefined, selectedFamilies[0]);
    navigate('/assessment');
  }; */
  const handleStartAssessment = () => {
    if (selectedFamilies.length === 0) {
      alert('Veuillez sélectionner au moins une famille');
      return;
    }
    
    startAssessment('NIST', selectedFamilies);
    navigate('/assessment');
  };
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Sélectionnez les familles NIST à évaluer
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Choisissez une ou plusieurs familles du référentiel NIST pour lesquelles vous souhaitez évaluer la maturité de votre organisation.
        </p>
        
        <div className="flex justify-end mb-4">
          <button
            onClick={handleSelectAll}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            <CheckCircle size={18} className="mr-2" />
            {selectedFamilies.length === NIST_FAMILIES.length ? 'Tout désélectionner' : 'Tout sélectionner'}
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {NIST_FAMILIES.map(family => (
            <FamilyCard
              key={family}
              family={family}
              isSelected={selectedFamilies.includes(family)}
              onToggle={handleToggleFamily}
            />
          ))}
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Retour
          </button>
          
          <button
            onClick={handleStartAssessment}
            disabled={selectedFamilies.length === 0}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
              selectedFamilies.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Commencer l'évaluation
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SelectFamilyPage; 
