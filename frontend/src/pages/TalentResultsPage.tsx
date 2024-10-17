import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../context/UserDataContext';
import { talents } from '../data/talents';  // Assuming we have a talents data file with predefined talent descriptions

const TalentResultsPage: React.FC = () => {
  const { userData } = useUserData();
  const [topTalents, setTopTalents] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.talentTestResults) {
      // Sort talents by score and take the top 10
      const sortedTalents = Object.entries(userData.talentTestResults)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([id]) => talents.find((talent) => talent.id.toString() === id));

      setTopTalents(sortedTalents);
    }
  }, [userData.talentTestResults]);

  const handleNext = () => {
    // Navigate to the final results page where GPT response will be displayed
    navigate('/final-results');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center mb-6">Deine Top Talente</h2>

        {/* Display Top Talents */}
        {topTalents.length > 0 ? (
          <div className="space-y-4">
            {topTalents.map((talent, index) => (
              <div key={talent.id} className="p-4 bg-primary rounded-md">
                <h3 className="text-lg font-bold">{index + 1}. {talent.name}</h3>
                <p className="mt-2 text-sm">{talent.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">Lade deine Talente...</p>
        )}

        {/* Next Button */}
        <div className="mt-6 text-center">
          <button onClick={handleNext} className="btn btn-primary w-full">
            Weiter zu den Ergebnissen
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalentResultsPage;