import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the user data, including talents, interests, and work preferences
export type GptResponse = {
  talents: Array<{ name: string; description: string }>;
  careers: Array<{ title: string; description: string }>;
  education: Array<{ title: string; description: string }>;
};

export type UserData = {
  name: string;
  age?: number;
  status: string;
  email: string;
  interests?: string[];
  favoriteSubjects?: string[];
  workPreferences?: {
    location: string;
    workingTime: string;
    salaryImportance: string;
    physicalWork: string;
    language: string;
  };
  talentTestResults?: { [key: number]: number };
  gptResponse?: GptResponse; // Ensure gptResponse is typed properly
};

// Define the context type with the user data and the function to update it
type UserDataContextType = {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  updateUserData: (newData: Partial<UserData>) => void;  // Add function to update specific parts of the user data
};

// Create the UserData context
const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

// Hook for consuming the user data context
export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};

// UserDataProvider component that manages the user data state and provides it to the rest of the app
export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    age: undefined,
    status: '',
    email: '',
    interests: [],                      // Initialize interests as an empty array
    favoriteSubjects: [],               // Initialize favorite subjects as an empty array
    workPreferences: {
      location: '',
      workingTime: '',
      salaryImportance: '',
      physicalWork: '',
      language: ''
    },
    talentTestResults: {},              // Initialize talentTestResults as an empty object
  });

  // Function to update user data with partial data (only updating specific fields as needed)
  const updateUserData = (newData: Partial<UserData>) => {
    // Log updated data for debugging
    console.log('Updating user data with:', newData);
    
    setUserData((prevUserData) => ({
      ...prevUserData,
      ...newData,  // Merge the new data with the existing user data
    }));
  };

  return (
    <UserDataContext.Provider value={{ userData, setUserData, updateUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};