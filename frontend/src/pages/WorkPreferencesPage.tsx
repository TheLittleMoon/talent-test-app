import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../context/UserDataContext';
import { formatGptPrompt } from '../utils/formatGptPrompt';

const WorkPreferencesPage: React.FC = () => {
  const { userData, setUserData, updateUserData } = useUserData();
  const [location, setLocation] = useState('');
  const [workingTime, setWorkingTime] = useState('');
  const [salaryImportance, setSalaryImportance] = useState('');
  const [physicalWork, setPhysicalWork] = useState('');
  const [language, setLanguage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    // Navigate to Talent Results page immediately
    navigate('/talent-results');

    // Generate the GPT prompt
    const prompt = formatGptPrompt(updatedUserData);

    // Log the generated GPT prompt for debugging purposes
    console.log('Generated GPT prompt:', prompt);

    // Set loading state
    setLoading(true);

    try {
      // Send user data and prompt to the backend asynchronously
      const response = await fetch('http://localhost:3000/api/talent-test/results', {
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
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center mb-6">Arbeitspräferenzen</h2>

        {/* Location Input */}
        <div className="mb-4">
          <label className="label">Bevorzugter Arbeitsort</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input"
          >
            <option value="" disabled>Wähle</option>
            <option value="Remote">Remote</option>
            <option value="Büro">Büro</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Working Time Input */}
        <div className="mb-4">
          <label className="label">Arbeitszeiten</label>
          <select
            value={workingTime}
            onChange={(e) => setWorkingTime(e.target.value)}
            className="input"
          >
            <option value="" disabled>Wähle</option>
            <option value="Flexible">Flexible</option>
            <option value="Feste Zeiten">Feste Zeiten</option>
          </select>
        </div>

        {/* Salary Importance */}
        <div className="mb-4">
          <label className="label">Ist ein gutes Gehalt wichtig?</label>
          <select
            value={salaryImportance}
            onChange={(e) => setSalaryImportance(e.target.value)}
            className="input"
          >
            <option value="" disabled>Wähle</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Physical Work Input */}
        <div className="mb-4">
          <label className="label">Physische Arbeit</label>
          <select
            value={physicalWork}
            onChange={(e) => setPhysicalWork(e.target.value)}
            className="input"
          >
            <option value="" disabled>Wähle</option>
            <option value="Ja">Ja</option>
            <option value="Nein">Nein</option>
          </select>
        </div>

        {/* Language Preference Input */}
        <div className="mb-4">
          <label className="label">Bevorzugte Sprache</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="input"
          >
            <option value="" disabled>Wähle</option>
            <option value="Deutsch">Deutsch</option>
            <option value="Englisch">Englisch</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button onClick={handleSubmit} className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Wird gesendet...' : 'Ergebnisse'}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xl mt-8">
        <div className="flex justify-between text-sm">
          <span>Persönliche Daten</span>
          <span>Talente</span>
          <span>Hobbys</span>
          <span>Fächer</span>
          <span className="font-semibold">Arbeitspräferenzen</span>
          <span>Ergebnisse</span>
        </div>
        <div className="relative mt-2 h-2 bg-border rounded-full">
          <div className="absolute left-0 top-0 h-2 bg-primary rounded-full" style={{ width: '80%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default WorkPreferencesPage;