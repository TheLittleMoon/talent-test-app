import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../context/UserDataContext';

const predefinedSubjects = [
  'Mathematik', 'Physik', 'Informatik', 'Biologie', 'Chemie', 'Geschichte', 'Literatur', 'Kunst', 'Musik', 'Sport'
];

const SubjectsPage: React.FC = () => {
  const { userData, updateUserData } = useUserData();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(userData.favoriteSubjects || []);
  const [customSubject, setCustomSubject] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const toggleSubject = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }

    // Log when a subject is toggled
    console.log('Toggled subject:', subject);
  };

  const addCustomSubject = () => {
    if (customSubject && !selectedSubjects.includes(customSubject)) {
      setSelectedSubjects([...selectedSubjects, customSubject]);
      setCustomSubject('');

      // Log when a custom subject is added
      console.log('Added custom subject:', customSubject);
    }
  };

  // Function to post selected subjects to the backend
  const postSelectedSubjects = async (subjects: string[]) => {
    try {
      const response = await fetch('http://localhost:3000/api/subjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,  // Send email for identification
          favoriteSubjects: subjects, // Send selected subjects
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit subjects');
      }

      console.log('Subjects submitted successfully');
    } catch (error) {
      console.error('Error submitting subjects:', error);
      throw error; // Re-throw the error to handle in the `handleNext` function
    }
  };

  const handleNext = async () => {
    // Ensure at least one subject is selected
    if (selectedSubjects.length === 0) {
      alert('Bitte wähle mindestens ein Fach');
      return;
    }

    // Log selected subjects before navigating to the next page
    console.log('Selected subjects:', selectedSubjects);

    // Save selected subjects to user data context
    updateUserData({ favoriteSubjects: selectedSubjects });

    // Set loading state to avoid multiple submissions
    setLoading(true);

    try {
      // POST the selected subjects to the backend
      await postSelectedSubjects(selectedSubjects);

      // Navigate to the next page (work preferences)
      navigate('/arbeitspräferenzen');
    } catch (error) {
      // Alert the user if there was an error submitting the data
      alert('Fehler beim Übermitteln deiner Fächer. Bitte versuche es erneut.');
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center mb-6">Wähle deine Lieblingsfächer</h2>

        {/* Predefined Subject Options */}
        <div className="grid grid-cols-2 gap-4">
          {predefinedSubjects.map((subject) => (
            <button
              key={subject}
              onClick={() => toggleSubject(subject)}
              className={`btn ${selectedSubjects.includes(subject) ? 'btn-primary' : 'btn-secondary'}`}
            >
              {subject}
            </button>
          ))}
        </div>

        {/* Custom Subject Input */}
        <div className="mt-6 flex space-x-4">
          <input
            type="text"
            value={customSubject}
            onChange={(e) => setCustomSubject(e.target.value)}
            className="input w-full"
            placeholder="Füge dein eigenes Fach hinzu"
          />
          <button onClick={addCustomSubject} className="btn btn-primary">
            Add
          </button>
        </div>

        {/* Selected Subjects List */}
        {selectedSubjects.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Deine ausgewählten Fächer:</h3>
            <ul className="list-disc ml-6 mt-2">
              {selectedSubjects.map((subject) => (
                <li key={subject}>{subject}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <a href="/interests" className="btn btn-secondary">
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
          <span>Hobbys</span>
          <span className="font-semibold">Fächer</span>
          <span>Arbeitspräferenzen</span>
          <span>Ergebnisse</span>
        </div>
        <div className="relative mt-2 h-2 bg-border rounded-full">
          <div className="absolute left-0 top-0 h-2 bg-primary rounded-full" style={{ width: '64%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SubjectsPage;