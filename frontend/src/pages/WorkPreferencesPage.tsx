import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../context/UserDataContext';
import { formatGptPrompt } from '../utils/formatGptPrompt';
import Layout from '../components/Layout'; // Import Layout for consistent structure
import { MapPin, Clock, DollarSign, Activity, Languages } from 'lucide-react'; // Import icons
import Progress from '../components/Progress';


const WorkPreferencesPage: React.FC = () => {
  const { userData, setUserData, updateUserData } = useUserData();
  const [location, setLocation] = useState('');
  const [workingTime, setWorkingTime] = useState('');
  const [salaryImportance, setSalaryImportance] = useState('');
  const [physicalWork, setPhysicalWork] = useState('');
  const [language, setLanguage] = useState('');
  const [loading] = useState(false);
  const navigate = useNavigate();

  const steps = ['Persönliche Daten', 'Talente', 'Hobbys', 'Fächer', 'Arbeitspräferenzen', 'Ergebnisse'];

  const handleSubmit = async () => {
    // Check that all preferences are selected
    if (!location || !workingTime || !salaryImportance || !physicalWork || !language) {
      alert('Bitte fülle alle Felder aus');
      return;
    }
  
    const updatedUserData = {
      ...userData,
      workPreferences: {
        location,
        workingTime,
        salaryImportance,
        physicalWork,
        language,
      },
    };
  
    // Log work preferences before submission
    console.log('Work preferences submitted:', updatedUserData.workPreferences);
  
    // Update userData in context
    setUserData(updatedUserData);
  
    // Immediately navigate to the Talent Results page
    navigate('/talent-results');
  
    try {
      // Generate the GPT prompt
      const prompt = formatGptPrompt(updatedUserData);
  
      // Log the generated GPT prompt for debugging purposes
      console.log('Generated GPT prompt:', prompt);
  
      // Start the GPT API call
      const response = await fetch('http://134.209.234.6:3000/api/talent-test/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInfo: updatedUserData, prompt }),
      });

  
      if (!response.ok) {
        throw new Error('Error submitting data to the server');
      }
  
      const data = await response.json();
      console.log('GPT and DB response:', data);
  
      // Update userData with GPT response
      updateUserData({ gptResponse: data.gptResponse });
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Fehler beim Senden der Daten. Bitte versuche es erneut.');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-xl bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-center mb-6">Arbeitspräferenzen</h2>

          {/* Location Input */}
          <div className="mb-6">
            <label className="flex items-center text-lg font-semibold">
              <MapPin className="mr-2 text-primary" />
              Bevorzugter Arbeitsort
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input mt-2"
            >
              <option value="" disabled>Wähle</option>
              <option value="Remote">Remote</option>
              <option value="Büro">Büro</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Doesn't Matter">Egal</option> {/* Doesn't Matter Option */}
            </select>
          </div>

          {/* Working Time Input */}
          <div className="mb-6">
            <label className="flex items-center text-lg font-semibold">
              <Clock className="mr-2 text-primary" />
              Arbeitszeiten
            </label>
            <select
              value={workingTime}
              onChange={(e) => setWorkingTime(e.target.value)}
              className="input mt-2"
            >
              <option value="" disabled>Wähle</option>
              <option value="Flexible">Flexible</option>
              <option value="Feste Zeiten">Feste Zeiten</option>
              <option value="Doesn't Matter">Egal</option> {/* Doesn't Matter Option */}
            </select>
          </div>

          {/* Salary Importance */}
          <div className="mb-6">
            <label className="flex items-center text-lg font-semibold">
              <DollarSign className="mr-2 text-primary" />
              Ist ein gutes Gehalt wichtig?
            </label>
            <select
              value={salaryImportance}
              onChange={(e) => setSalaryImportance(e.target.value)}
              className="input mt-2"
            >
              <option value="" disabled>Wähle</option>
              <option value="Yes">Ja</option>
              <option value="No">Nein</option>
              <option value="Doesn't Matter">Egal</option> {/* Doesn't Matter Option */}
            </select>
          </div>

          {/* Physical Work Input */}
          <div className="mb-6">
            <label className="flex items-center text-lg font-semibold">
              <Activity className="mr-2 text-primary" />
              Physische Arbeit
            </label>
            <select
              value={physicalWork}
              onChange={(e) => setPhysicalWork(e.target.value)}
              className="input mt-2"
            >
              <option value="" disabled>Wähle</option>
              <option value="Ja">Ja</option>
              <option value="Nein">Nein</option>
              <option value="Doesn't Matter">Egal</option> {/* Doesn't Matter Option */}
            </select>
          </div>

          {/* Language Preference Input */}
          <div className="mb-6">
            <label className="flex items-center text-lg font-semibold">
              <Languages className="mr-2 text-primary" />
              Bevorzugte Sprache
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="input mt-2"
            >
              <option value="" disabled>Wähle</option>
              <option value="Deutsch">Deutsch</option>
              <option value="Englisch">Englisch</option>
              <option value="Flexible">Flexible</option>
              <option value="Doesn't Matter">Egal</option> {/* Doesn't Matter Option */}
            </select>
          </div>

          {/* Submit Button */}
          <div className="mt-6 text-center">
            <button onClick={handleSubmit} className="btn btn-primary w-full" disabled={loading}>
              {loading ? 'Wird gesendet...' : 'Ergebnisse'}
            </button>
          </div>
        </div>
        <div className="w-full max-w-4xl mx-auto mt-8 px-4">
          <Progress currentStep={5} totalSteps={6} steps={steps} />
        </div>
      </div>
    </Layout>
  );
};

export default WorkPreferencesPage;