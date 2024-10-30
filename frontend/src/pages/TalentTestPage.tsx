import React, { useState, useEffect } from 'react';
import { scenarios } from '../data/scenarios';
import { talents } from '../data/talents';  
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../context/UserDataContext';
import Card from '../components/Card';  // Importing Card for wrapping content
import Button from '../components/Button';  // Importing Button for custom styles
import Progress from '../components/Progress';  // Application Progress bar component
import Layout from '../components/Layout';  // Importing Layout to wrap content

const steps = ['Persönliche Daten', 'Talente', 'Hobbys', 'Fächer', 'Arbeitspräferenzen', 'Ergebnisse'];

const TalentTestPage: React.FC = () => {
  const { userData, updateUserData } = useUserData();
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Initialize talentTestResults if not already set
  useEffect(() => {
    if (!userData.talentTestResults || Object.keys(userData.talentTestResults).length === 0) {
      const initialTalentScores: { [key: number]: number } = {};
      talents.forEach((talent) => {
        initialTalentScores[talent.id] = 0;
      });
      updateUserData({ talentTestResults: initialTalentScores });
    }
  }, [userData.talentTestResults, updateUserData]);

  // Handle answer selection
  const handleAnswerSelection = (answerId: string) => {
    setSelectedAnswerId(answerId);
  };

  // Function to post talent scores to the backend after every scenario
  const postTalentScores = async (updatedScores: { [key: number]: number }) => {
    try {
      const response = await fetch('http://134.209.234.6:3000/api/talent-test/talent-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,  // Send email for identification
          talentTestResults: updatedScores,  // Send updated talent scores
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit talent test results');
      }

    } catch (error) {
      console.error('Error submitting talent test results:', error);
    }
  };

  // Handle submitting the selected answer
  const handleSubmitAnswer = () => {
    const selectedAnswer = scenarios[currentScenarioIndex].answers.find(
      (answer) => answer.id === selectedAnswerId
    );

    if (!selectedAnswer) return;

    // Update talentTestResults based on selected answer
    const updatedScores = { ...userData.talentTestResults };
    selectedAnswer.talents.forEach((talent) => {
      updatedScores[talent.talentId] += talent.weight;
    });

    updateUserData({ talentTestResults: updatedScores });

    // POST the updated talent scores to the backend
    postTalentScores(updatedScores);

    setSelectedAnswerId(null);

    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
    } else {
      navigate('/interests', { state: { talentScores: updatedScores } });
    }
  };

  const currentScenario = scenarios[currentScenarioIndex];

  return (
    <Layout>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        {/* Talente Test Header */}
        <h2 className="text-xl font-semibold text-center mb-6">Talente Test</h2>

        {/* Main content without hover effect */}
        <Card className="w-full max-w-xl p-6 rounded-lg shadow-md hover:scale-100 transition-none">
          <p className="text-lg mb-4">{currentScenario.question}</p>

          <div className="space-y-4">
            {currentScenario.answers.map((answer) => (
              <label key={answer.id} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={answer.id}
                  checked={selectedAnswerId === answer.id}
                  onChange={() => handleAnswerSelection(answer.id)}
                  className="form-radio text-primary"
                />
                <span>{answer.text}</span>
              </label>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswerId}
              className="hover-scale"
            >
              {currentScenarioIndex < scenarios.length - 1 ? 'Weiter' : 'Hobbys'}
            </Button>
          </div>

          <div className="mt-6 text-center text-muted-foreground">
            Scenario {currentScenarioIndex + 1} of {scenarios.length}
          </div>
        </Card>

        {/* Application Progress Bar */}
        <div className="w-full max-w-4xl mx-auto mt-8 px-4">
          <Progress currentStep={2} totalSteps={6} steps={steps} />
        </div>
      </div>
    </Layout>
  );
};

export default TalentTestPage;