import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../context/UserDataContext';
import Layout from '../components/Layout'; // Importing Layout to wrap content
import Button from '../components/Button'; // Custom Button component
import Card from '../components/Card'; // Custom Card component
import Input from '../components/Input'; // Custom Input component
import Progress from '../components/Progress'; // Progress bar component

import { Gamepad, Activity, Book, Music, Palette, Camera, Plane, Monitor, Film, Shirt } from 'lucide-react'; // Lucide icons

// Modify the predefinedInterests array to include icons
const predefinedInterests = [
  { name: 'Spiele', icon: <Gamepad className="mr-2" /> },
  { name: 'Sport', icon: <Activity className="mr-2" /> },
  { name: 'Lesen', icon: <Book className="mr-2" /> },
  { name: 'Musik', icon: <Music className="mr-2" /> },
  { name: 'Kunst', icon: <Palette className="mr-2" /> },
  { name: 'Kochen', icon: <Palette className="mr-2" /> },  // Using Palette icon as a placeholder
  { name: 'Fotografie', icon: <Camera className="mr-2" /> },
  { name: 'Reisen', icon: <Plane className="mr-2" /> },
  { name: 'Technologie', icon: <Monitor className="mr-2" /> },
  { name: 'Filme', icon: <Film className="mr-2" /> },
  { name: 'Mode', icon: <Shirt className="mr-2" /> },
];

const steps = ['Persönliche Daten', 'Talente', 'Hobbys', 'Fächer', 'Arbeitspräferenzen', 'Ergebnisse'];

const InterestsPage: React.FC = () => {
  const { userData, updateUserData } = useUserData();
  const [selectedInterests, setSelectedInterests] = useState<string[]>(userData.interests || []);
  const [customInterest, setCustomInterest] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const addCustomInterest = () => {
    if (customInterest && !selectedInterests.includes(customInterest)) {
      setSelectedInterests([...selectedInterests, customInterest]);
      setCustomInterest('');
    }
  };

  const postSelectedInterests = async (interests: string[]) => {
    try {
      const response = await fetch('http://localhost:3000/api/interests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          interests,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit interests');
      }
    } catch (error) {
      console.error('Error submitting interests:', error);
      throw error;
    }
  };

  const handleNext = async () => {
    if (selectedInterests.length === 0) {
      alert('Bitte wähle mindestens ein Hobby');
      return;
    }

    updateUserData({ interests: selectedInterests });
    setLoading(true);

    try {
      await postSelectedInterests(selectedInterests);
      navigate('/fächer');
    } catch (error) {
      alert('Fehler beim Übermitteln deiner Hobbys. Bitte versuche es erneut.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <Card className="w-full max-w-xl p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-center mb-6">Wähle deine Hobbys</h2>

          <div className="grid grid-cols-2 gap-4">
            {predefinedInterests.map(({ name, icon }) => (
              <Button
                key={name}
                onClick={() => toggleInterest(name)}
                className={selectedInterests.includes(name) ? 'btn-primary' : 'btn-secondary'}
              >
                {icon} {name}
              </Button>
            ))}
          </div>

          <div className="mt-6 flex space-x-4">
            <Input
              id="customInterest"
              type="text"
              value={customInterest}
              onChange={(e) => setCustomInterest(e.target.value)}
              className="w-full"
              placeholder="Füge dein eigenes Hobby hinzu"
            />
            <Button onClick={addCustomInterest} className="btn-primary">
              Add
            </Button>
          </div>

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

          <div className="mt-8 flex justify-between">
            <a href="/talente-test" className="btn btn-secondary">
              Zurück
            </a>
            <Button onClick={handleNext} disabled={loading} className="btn-primary">
              {loading ? 'Wird gesendet...' : 'Weiter'}
            </Button>
          </div>
        </Card>

        <div className="max-w-xl mx-auto mt-8">
          <Progress currentStep={3} totalSteps={6} steps={steps} />
        </div>
      </div>
    </Layout>
  );
};

export default InterestsPage;