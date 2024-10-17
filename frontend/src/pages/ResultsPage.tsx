import React, { useEffect, useState } from 'react';
import { useUserData } from '../context/UserDataContext';
import Layout from '../components/Layout';  // Importing Layout for consistent structure
import { parseCareers } from '../utils/parsingUtils';  // Import the parsing utility

// Make sure gptResponse is typed as a string
interface UserData {
  gptResponse?: string;
}

const ResultsPage: React.FC = () => {
  const { userData } = useUserData() as { userData: UserData }; // Add type for userData
  const [parsedCareers, setParsedCareers] = useState<any[]>([]);  // State to store parsed careers
  const [errorMessage, setErrorMessage] = useState<string | null>(null);  // State for handling errors

  useEffect(() => {
    // Ensure gptResponse exists and is a string before parsing
    if (userData.gptResponse) {
      try {
        const careers = parseCareers(userData.gptResponse);
        if (careers.length > 0) {
          setParsedCareers(careers);  // Update state with parsed career data
        } else {
          setErrorMessage('Keine Karrierevorschläge verfügbar.');
        }
      } catch (error) {
        console.error('Error parsing GPT response:', error);
        setErrorMessage('Fehler beim Verarbeiten der Karrierevorschläge.');
      }
    } else {
      setErrorMessage('Keine Karrierevorschläge verfügbar.');
    }
  }, [userData.gptResponse]);

  return (
    <Layout>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-xl bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-center mb-6">Karrierevorschläge</h2>

          {/* If there is an error message, display it */}
          {errorMessage ? (
            <p className="text-center text-red-500">{errorMessage}</p>
          ) : (
            <div className="space-y-4">
              {/* Map through the parsed career data and render each one */}
              {parsedCareers.map((career, index) => (
                <div key={index} className="p-4 bg-primary rounded-md">
                  <h3 className="text-lg font-bold">Karriere {index + 1}: {career.name}</h3>
                  <p className="mt-2 text-sm"><strong>Beschreibung:</strong> {career.description}</p>
                  <p className="mt-2 text-sm"><strong>Bildungspfad:</strong> {career.educationPath}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ResultsPage;