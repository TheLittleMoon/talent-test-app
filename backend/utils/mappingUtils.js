// Mapping for employment status from German to English
const employmentStatusMapping = {
  'Student': 'student',
  'Angestellt': 'employed',
  'Selbständig': 'self-employed',
  'Arbeitslos': 'unemployed',
  'Anderes': 'other'
};

// Mapping for work preferences
const workPreferencesMapping = {
  location: {
    'Vor Ort': 'on-site',
    'Hybrid': 'hybrid',
    'Remote': 'remote'
  },
  workingTime: {
    'Flexibel': 'flexible',
    'Vollzeit': 'full-time',
    'Teilzeit': 'part-time'
  },
  salaryImportance: {
    'Ja': 'yes',
    'Nein': 'no'
  },
  physicalWork: {
    'Ja': 'yes',
    'Nein': 'no'
  },
  language: {
    'Deutsch': 'german',
    'Englisch': 'english',
    'Flexible': 'flexible'
  }
};

// Mapping for predefined interests from German to English
const interestsMapping = {
  'Spiele': 'Gaming',
  'Sport': 'Sports',
  'Lesen': 'Reading',
  'Musik': 'Music',
  'Kunst': 'Art',
  'Kochen': 'Cooking',
  'Fotografie': 'Photography',
  'Reisen': 'Travel',
  'Technologie': 'Technology',
  'Filme': 'Movies',
  'Mode': 'Fashion'
};

// Function to map employment status
export const mapEmploymentStatus = (status) => {
  const mappedStatus = employmentStatusMapping[status];
  if (!mappedStatus) {
    console.warn(`Unmapped employment status: ${status}`);
  }
  return mappedStatus || 'other';
};

// Function to map work preferences
export const mapWorkPreferences = (preferences = {}) => {
  return {
    location: workPreferencesMapping.location[preferences.location] || 'not specified',
    workingTime: workPreferencesMapping.workingTime[preferences.workingTime] || 'not specified',
    salaryImportance: workPreferencesMapping.salaryImportance[preferences.salaryImportance] || 'not specified',
    physicalWork: workPreferencesMapping.physicalWork[preferences.physicalWork] || 'not specified',
    language: workPreferencesMapping.language[preferences.language] || 'not specified'
  };
};

// Function to map interests, leaving custom interests unchanged
export const mapInterests = (interests = []) => {
  return interests.map(interest => {
    const mappedInterest = interestsMapping[interest];
    if (!mappedInterest) {
      console.warn(`Unmapped interest: ${interest}`);
    }
    return mappedInterest || interest; // Map predefined interests, leave custom ones as is
  });
};

// Function to map subjects (assuming they are in German and no mapping is needed)
export const mapInterestsAndSubjects = (interests = [], subjects = []) => {
  return {
    interests: mapInterests(interests),
    favoriteSubjects: subjects // Assuming subjects need no mapping
  };
};