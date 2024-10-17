import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../context/UserDataContext';

const predefinedInterests = [
  'Spiele', 'Sport', 'Lesen', 'Musik', 'Kunst', 'Kochen', 'Fotografie', 'Reisen', 'Technologie', 'Filme', 'Mode'
];

const InterestsPage: React.FC = () => {
  const { userData, updateUserData } = useUserData();
  const [selectedInterests, setSelectedInterests] = useState<string[]>(userData.interests || []);
  const [customInterest, setCustomInterest] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }

    // Log when an interest is toggled
    console.log('Toggled interest:', interest);
  };

  const addCustomInterest = () => {
    if (customInterest && !selectedInterests.includes(customInterest)) {
      setSelectedInterests([...selectedInterests, customInterest]);
      setCustomInterest('');

      // Log when a custom interest is added
      console.log('Added custom interest:', customInterest);
    }
  };

  // Function to post selected interests to the backend
  const postSelectedInterests = async (interests: string[]) => {
    try {
      const response = await fetch('http://localhost:3000/api/interests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,  // Send email for identification
          interests,              // Send selected interests
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit interests');
      }

      console.log('Interests submitted successfully');
    } catch (error) {
      console.error('Error submitting interests:', error);
      throw error; // Re-throw the error to handle it in the `handleNext` function
    }
  };

  const handleNext = async () => {
    // Check if no interest has been selected
    if (selectedInterests.length === 0) {
      alert('Bitte wähle mindestens ein Hobby');
      return;
    }

    // Log selected interests before navigating to the next page
    console.log('Selected interests:', selectedInterests);

    // Save selected interests to user data context
    updateUserData({ interests: selectedInterests });

    // Set loading state to prevent multiple submissions
    setLoading(true);

    try {
      // POST the selected interests to the backend
      await postSelectedInterests(selectedInterests);

      // Navigate to the next page (subjects)
      navigate('/fächer');
    } catch (error) {
      // Alert the user if there was an error submitting the data
      alert('Fehler beim Übermitteln deiner Hobbys. Bitte versuche es erneut.');
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center mb-6">Wähle deine Hobbys</h2>

        {/* Predefined Interest Options */}
        <div className="grid grid-cols-2 gap-4">
          {predefinedInterests.map((interest) => (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`btn ${selectedInterests.includes(interest) ? 'btn-primary' : 'btn-secondary'}`}
            >
              {interest}
            </button>
          ))}
        </div>

        {/* Custom Interest Input */}
        <div className="mt-6 flex space-x-4">
          <input
            type="text"
            value={customInterest}
            onChange={(e) => setCustomInterest(e.target.value)}
            className="input w-full"
            placeholder="Füge dein eigenes Hobby hinzu"
          />
          <button onClick={addCustomInterest} className="btn btn-primary">
            Add
          </button>
        </div>

        {/* Selected Interests List */}
        {selectedInterests.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Deine ausgewählten Hobbys:</h3>
            <ul className="list-disc ml-6 mt-2">
              {selectedInterests.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <a href="/talente-test" className="btn btn-secondary">
            Zurück
          </a>
          <button onClick={handleNext} className="btn btn-primary" disabled={loading}>
            {loading ? 'Wird gesendet...' : 'Weiter'}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xl mt-8">
        <div className="flex justify-between text-sm">
          <span>Persönliche Daten</span>
          <span>Talente</span>
          <span className="font-semibold">Hobbys</span>
          <span>Fächer</span>
          <span>Arbeitspräferenzen</span>
          <span>Ergebnisse</span>
        </div>
        <div className="relative mt-2 h-2 bg-border rounded-full">
          <div className="absolute left-0 top-0 h-2 bg-primary rounded-full" style={{ width: '48%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default InterestsPage;