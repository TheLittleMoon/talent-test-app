import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // For routing
import './styles/global.css';  // Import the global styles

import LandingPage from './pages/LandingPage'; // Import the LandingPage
import PersonalInfoPage from './pages/PersonalInfoPage';
import TalentTestPage from './pages/TalentTestPage';
import InterestsPage from './pages/InterestsPage';
import SubjectsPage from './pages/SubjectsPage';
import WorkPreferencesPage from './pages/WorkPreferencesPage';
import TalentResultsPage from './pages/TalentResultsPage';  // Added Talent Results Page
import ResultsPage from './pages/ResultsPage';  // Final GPT results

import { UserDataProvider } from './context/UserDataContext'; // Import the UserDataProvider

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define the routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/personal-info" element={<PersonalInfoPage />} />
        <Route path="/talente-test" element={<TalentTestPage />} />
        <Route path="/interests" element={<InterestsPage />} />
        <Route path="/fächer" element={<SubjectsPage />} />
        <Route path="/arbeitspräferenzen" element={<WorkPreferencesPage />} />
        <Route path="/talent-results" element={<TalentResultsPage />} />  {/* Added Talent Results */}
        <Route path="/final-results" element={<ResultsPage />} />  {/* GPT Results */}
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserDataProvider> {/* Wrap the app with the provider */}
      <App />
    </UserDataProvider>
  </React.StrictMode>,
);