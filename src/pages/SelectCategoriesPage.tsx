import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import CategoryCheckbox from '../components/CategoryCheckbox';
import { Framework } from '../types';
import { SMSI_CATEGORIES, SMCA_CATEGORIES } from '../data/frameworks';
import { useAssessment } from '../context/AssessmentContext';
import { CheckCircle } from 'lucide-react';

const SelectCategoriesPage: React.FC = () => {
  const { framework } = useParams<{ framework: string }>();
  const navigate = useNavigate();
  const { startAssessment } = useAssessment();
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const categories = framework === 'smsi' ? SMSI_CATEGORIES : SMCA_CATEGORIES;
  
  const handleToggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };
  
  const handleSelectAll = () => {
    if (selectedCategories.length === categories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(categories.map(cat => cat.id));
    }
  };
  
  const handleStartAssessment = () => {
    if (selectedCategories.length === 0) {
      alert('Veuillez sélectionner au moins une catégorie');
      return;
    }

    // Correction ici, utilise "categories" à la place de "families"
    startAssessment(framework?.toUpperCase() as Framework, undefined, selectedCategories);
    navigate('/assessment');
  };
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Sélectionnez les catégories à évaluer
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Choisissez une ou plusieurs catégories du référentiel {framework?.toUpperCase()} pour lesquelles vous souhaitez évaluer la maturité de votre organisation.
        </p>
        
        <div className="flex justify-end mb-4">
          <button
            onClick={handleSelectAll}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            <CheckCircle size={18} className="mr-2" />
            {selectedCategories.length === categories.length ? 'Tout désélectionner' : 'Tout sélectionner'}
          </button>
        </div>
        
        <div className="mb-8">
          {categories.map(category => (
            <CategoryCheckbox
              key={category.id}
              category={category}
              isSelected={selectedCategories.includes(category.id)}
              onToggle={handleToggleCategory}
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
            disabled={selectedCategories.length === 0}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
              selectedCategories.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Commencer l'évaluation
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SelectCategoriesPage;
