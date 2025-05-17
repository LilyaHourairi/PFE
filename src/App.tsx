import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AssessmentProvider } from './context/AssessmentContext';

// Pages
import HomePage from './pages/HomePage';
import SelectCategoriesPage from './pages/SelectCategoriesPage';
import SelectFamilyPage from './pages/SelectFamilyPage';
import AssessmentPage from './pages/AssessmentPage';
import ResultsPage from './pages/ResultsPage';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <ThemeProvider>
      <AssessmentProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/select/nist" element={<SelectFamilyPage />} />
            <Route path="/select/:framework" element={<SelectCategoriesPage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </Router>
      </AssessmentProvider>
    </ThemeProvider>
  );
}

export default App;