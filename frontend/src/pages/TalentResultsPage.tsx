import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../context/UserDataContext';
import { talents } from '../data/talents';  // Assuming we have a talents data file with predefined talent descriptions
import Layout from '../components/Layout'; // Importing Layout for consistent structure

const TalentResultsPage: React.FC = () => {
  const { userData } = useUserData();
  const [topTalents, setTopTalents] = useState<any[]>([]);
  const [expandedTalentIds, setExpandedTalentIds] = useState<number[]>([]);  // Track expanded talents
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

  const handleExpandTalent = (id: number) => {
    if (expandedTalentIds.includes(id)) {
      setExpandedTalentIds(expandedTalentIds.filter((expandedId) => expandedId !== id));
    } else {
      setExpandedTalentIds([...expandedTalentIds, id]);
    }
  };

  const handleNext = () => {
    navigate('/final-results');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-xl bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-center mb-6">Deine Top Talente</h2>

          {/* Display Top Talents */}
          {topTalents.length > 0 ? (
            <div className="space-y-4">
              {/* Show full description for the top 3 talents */}
              {topTalents.slice(0, 3).map((talent, index) => (
                <div key={talent.id} className="p-4 bg-primary rounded-md">
                  <h3 className="text-lg font-bold">{index + 1}. {talent.name}</h3>
                  <p className="mt-2 text-sm">{talent.description}</p>
                </div>
              ))}

              {/* Show the remaining talents as expandable boxes */}
              {topTalents.slice(3).map((talent, index) => (
                <div key={talent.id} className="p-4 bg-secondary rounded-md">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">{index + 4}. {talent.name}</h3>
                    <button
                      className="text-primary font-semibold"
                      onClick={() => handleExpandTalent(talent.id)}
                    >
                      {expandedTalentIds.includes(talent.id) ? 'Weniger anzeigen' : 'Mehr anzeigen'}
                    </button>
                  </div>
                  {expandedTalentIds.includes(talent.id) && (
                    <p className="mt-2 text-sm">{talent.description}</p>
                  )}
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
    </Layout>
  );
};

export default TalentResultsPage;