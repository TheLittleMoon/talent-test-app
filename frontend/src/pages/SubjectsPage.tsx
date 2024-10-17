import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../context/UserDataContext';
import Layout from '../components/Layout';  // Importing Layout for consistent structure
import Button from '../components/Button';  // Custom button styles
import Input from '../components/Input';  // Custom input styles
import Card from '../components/Card';  // Wrapping the content in a styled card
import Progress from '../components/Progress';  // Application progress bar

import { Calculator, Atom, Code, Brain, Beaker, BookOpen, Feather, Palette, Music, Dumbbell } from 'lucide-react'; // Import relevant icons

const predefinedSubjects = [
  { name: 'Mathematik', icon: <Calculator className="mr-2" /> },
  { name: 'Physik', icon: <Atom className="mr-2" /> },
  { name: 'Informatik', icon: <Code className="mr-2" /> },
  { name: 'Biologie', icon: <Brain className="mr-2" /> },
  { name: 'Chemie', icon: <Beaker className="mr-2" /> },
  { name: 'Geschichte', icon: <BookOpen className="mr-2" /> },
  { name: 'Literatur', icon: <Feather className="mr-2" /> },
  { name: 'Kunst', icon: <Palette className="mr-2" /> },
  { name: 'Musik', icon: <Music className="mr-2" /> },
  { name: 'Sport', icon: <Dumbbell className="mr-2" /> },
];

const steps = ['Persönliche Daten', 'Talente', 'Hobbys', 'Fächer', 'Arbeitspräferenzen', 'Ergebnisse'];

const SubjectsPage: React.FC = () => {
  const { userData, updateUserData } = useUserData();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(userData.favoriteSubjects || []);
  const [customSubject, setCustomSubject] = useState('');
  const [loading, setLoading] = useState(false);  // Added loading state
  const navigate = useNavigate();

  const toggleSubject = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const addCustomSubject = () => {
    if (customSubject && !selectedSubjects.includes(customSubject)) {
      setSelectedSubjects([...selectedSubjects, customSubject]);
      setCustomSubject('');
    }
  };

  const postSelectedSubjects = async (subjects: string[]) => {
    try {
      const response = await fetch('http://localhost:3000/api/subjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,  // Send email for identification
          favoriteSubjects: subjects,  // Send selected subjects
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit subjects');
      }

    } catch (error) {
      console.error('Error submitting subjects:', error);
      throw error;
    }
  };

  const handleNext = async () => {
    if (selectedSubjects.length === 0) {
      alert('Bitte wähle mindestens ein Fach');
      return;
    }

    updateUserData({ favoriteSubjects: selectedSubjects });
    setLoading(true);

    try {
      await postSelectedSubjects(selectedSubjects);
      navigate('/arbeitspräferenzen');
    } catch (error) {
      alert('Fehler beim Übermitteln deiner Fächer. Bitte versuche es erneut.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <Card className="w-full max-w-xl p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-center mb-6">Wähle deine Lieblingsfächer</h2>

          {/* Predefined Subject Options */}
          <div className="grid grid-cols-2 gap-4">
            {predefinedSubjects.map(({ name, icon }) => (
              <Button
                key={name}
                variant={selectedSubjects.includes(name) ? 'primary' : 'secondary'}
                onClick={() => toggleSubject(name)}
              >
                {icon} {name}
              </Button>
            ))}
          </div>

          {/* Custom Subject Input */}
          <div className="mt-6 flex space-x-4">
            <Input
              id="customSubject"  // Added id for consistency
              type="text"
              value={customSubject}
              onChange={(e) => setCustomSubject(e.target.value)}
              className="w-full"
              placeholder="Füge dein eigenes Fach hinzu"
            />
            <Button variant="primary" onClick={addCustomSubject}>Add</Button>
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
            <Button variant="secondary" onClick={() => navigate('/interests')}>Zurück</Button>
            <Button variant="primary" onClick={handleNext} disabled={loading}>
              {loading ? 'Wird gesendet...' : 'Weiter'}
            </Button>
          </div>
        </Card>

        {/* Progress Bar */}
        <Progress currentStep={4} totalSteps={6} steps={steps} />
      </div>
    </Layout>
  );
};

export default SubjectsPage;