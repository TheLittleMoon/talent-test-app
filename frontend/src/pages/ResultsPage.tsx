import React from 'react';
import { useUserData } from '../context/UserDataContext';

// Make sure gptResponse is typed as a string
interface UserData {
  gptResponse?: string;
}

const ResultsPage: React.FC = () => {
  const { userData } = useUserData() as { userData: UserData }; // Add type for userData

  // Ensure gptResponse exists and is a string before accessing it
  const gptResponse: string = userData.gptResponse || 'Lade Karrierevorschläge...';

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center mb-6">Karrierevorschläge</h2>

        {/* Display the entire GPT response as-is */}
        <div className="mb-6">
          <p className="text-center whitespace-pre-wrap">{gptResponse}</p> {/* Display GPT response */}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;