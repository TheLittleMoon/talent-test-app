import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../context/UserDataContext';
import { talents } from '../data/talents';  // Assuming we have a talents data file with predefined talent descriptions
import Layout from '../components/Layout'; // Importing Layout for consistent structure
import Progress from '../components/Progress';

const steps = ['Persönliche Daten', 'Talente', 'Hobbys', 'Fächer', 'Arbeitspräferenzen', 'Ergebnisse'];


const TalentResultsPage: React.FC = () => {
  const { userData } = useUserData();
  const [topTalents, setTopTalents] = useState<any[]>([]);
  const [expandedTalentIds, setExpandedTalentIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);  // Track loading state for GPT response
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch local talent results
    if (userData.talentTestResults) {
      const sortedTalents = Object.entries(userData.talentTestResults)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([id]) => talents.find((talent) => talent.id.toString() === id));

      setTopTalents(sortedTalents);
    }

    // Check if GPT response is loaded
    if (userData.gptResponse) {
      setLoading(false);  // GPT response is available, allow navigation
    }
  }, [userData.talentTestResults, userData.gptResponse]);

  const handleExpandTalent = (id: number) => {
    if (expandedTalentIds.includes(id)) {
      setExpandedTalentIds(expandedTalentIds.filter((expandedId) => expandedId !== id));
    } else {
      setExpandedTalentIds([...expandedTalentIds, id]);
    }
  };

  const handleNext = () => {
    if (!loading) {
      navigate('/final-results');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-xl bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-center mb-6">Deine Top Talente</h2>

          {/* Display Top Talents */}
          {topTalents.length > 0 ? (
            <div className="space-y-4">
              {topTalents.slice(0, 3).map((talent, index) => (
                <div key={talent.id} className="p-4 bg-primary rounded-md">
                <h3 className="text-lg font-bold text-primary-foreground">{index + 1}. {talent.name}</h3>
                <p className="mt-2 text-sm text-primary-foreground">{talent.description}</p>
              </div>
              ))}
              {topTalents.slice(3).map((talent, index) => (
                <div key={talent.id} className="p-4 bg-secondary rounded-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-secondary-foreground">{index + 4}. {talent.name}</h3>
                  <button
                    className="text-secondary-foreground font-semibold"
                    onClick={() => handleExpandTalent(talent.id)}
                  >
                    {expandedTalentIds.includes(talent.id) ? 'Weniger anzeigen' : 'Mehr anzeigen'}
                  </button>
                </div>
                {expandedTalentIds.includes(talent.id) && (
                  <p className="mt-2 text-sm text-secondary-foreground">{talent.description}</p>
                )}
              </div>
              ))}
            </div>
          ) : (
            <p className="text-center">Lade deine Talente...</p>
          )}

          {/* Next Button - Disabled until loading is false */}
          <div className="mt-6 text-center">
            <button onClick={handleNext} className="btn btn-primary w-full" disabled={loading}>
              {loading ? 'Lädt...' : 'Weiter zu den Ergebnissen'}
            </button>
          </div>
        </div>
        <div className="w-full max-w-4xl mx-auto mt-8 px-4">
          <Progress currentStep={6} totalSteps={6} steps={steps} />
        </div>
      </div>
    </Layout>
  );
};

export default TalentResultsPage;