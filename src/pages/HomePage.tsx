import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import FrameworkCard from '../components/FrameworkCard';
import { Framework } from '../types';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectFramework = (framework: Framework) => {
    navigate(`/select/${framework.toLowerCase()}`);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-transparent bg-clip-text">
            Plateforme d'Évaluation de Maturité
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Évaluez la maturité de votre organisation selon les référentiels reconnus
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <FrameworkCard
            framework="SMSI"
            title="SMSI"
            description="Système de Management de la Sécurité de l'Information basé sur ISO 27001"
            onSelect={handleSelectFramework}
          />
          <FrameworkCard
            framework="SMCA"
            title="SMCA"
            description="Système de Management de la Continuité d'Activité"
            onSelect={handleSelectFramework}
          />
          <FrameworkCard
            framework="NIST"
            title="NIST"
            description="National Institute of Standards and Technology Cybersecurity Framework"
            onSelect={handleSelectFramework}
          />
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Comment ça fonctionne ?
          </h2>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
            <li>Sélectionnez un référentiel (SMSI, SMCA ou NIST)</li>
            <li>Choisissez les domaines ou familles à évaluer</li>
            <li>Répondez aux questions d'évaluation</li>
            <li>Obtenez un score de maturité et des recommandations personnalisées</li>
            <li>Exportez votre rapport pour le partager avec votre équipe</li>
          </ol>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;