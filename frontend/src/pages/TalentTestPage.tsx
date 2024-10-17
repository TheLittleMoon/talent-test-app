import React, { useState, useEffect } from 'react';
import { scenarios } from '../data/scenarios';
import { talents } from '../data/talents';  // Keep using talents here to calculate initial scores
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../context/UserDataContext';

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

      // Log initial talent scores for debugging
      console.log('Initial talent scores:', initialTalentScores);
    }
  }, [userData.talentTestResults, updateUserData]);

  // Handle answer selection
  const handleAnswerSelection = (answerId: string) => {
    setSelectedAnswerId(answerId);
  };

  // Function to post talent scores to the backend after every scenario
  const postTalentScores = async (updatedScores: { [key: number]: number }) => {
    try {
      const response = await fetch('http://localhost:3000/api/talent-test', {
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

      console.log('Talent test results submitted successfully');
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

    // Log selected answer and updated talent scores for debugging
    console.log('Selected answer:', selectedAnswer);
    console.log('Updated talent scores:', updatedScores);

    // Update user data with new talentTestResults
    updateUserData({ talentTestResults: updatedScores });

    // POST the updated talent scores to the backend
    postTalentScores(updatedScores);

    setSelectedAnswerId(null);

    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
    } else {
      // Log final scores and navigate to the next page
      console.log('Test completed. Final talent scores:', updatedScores);
      navigate('/interests', { state: { talentScores: updatedScores } });
    }
  };

  const currentScenario = scenarios[currentScenarioIndex];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center mb-6">Talente Test</h2>

        {/* Scenario Question */}
        <p className="text-lg mb-4">{currentScenario.question}</p>

        {/* Answer Options */}
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

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleSubmitAnswer}
            className="btn btn-primary hover-scale"
            disabled={!selectedAnswerId}
          >
            Weiter
          </button>
        </div>

        {/* Scenario Counter */}
        <div className="mt-6 text-center text-muted-foreground">
          Scenario {currentScenarioIndex + 1} of {scenarios.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xl mt-8">
        <div className="relative h-2 bg-border rounded-full">
          <div
            className="absolute left-0 top-0 h-2 bg-primary rounded-full"
            style={{ width: `${((currentScenarioIndex + 1) / scenarios.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TalentTestPage;