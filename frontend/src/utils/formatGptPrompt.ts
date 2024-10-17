import { getTalentNameById } from '../data/talents';
import { UserData } from '../context/UserDataContext';

export function formatGptPrompt(userData: UserData): string {
  if (!userData.talentTestResults) {
    console.error('Talent test results are missing in userData');
    return '';
  }

  // Sort talents by score in descending order
  const sortedTalents = Object.entries(userData.talentTestResults)
    .map(([id, score]) => ({ id: parseInt(id), score }))
    .sort((a, b) => b.score - a.score);

  // Get top 5 talents
  const top5Talents = sortedTalents.slice(0, 5);

  // Map talent IDs to names
  const top5TalentNames = top5Talents.map(talent => {
    const talentName = getTalentNameById(talent.id);
    return {
      name: talentName || 'Unknown Talent',
      score: talent.score
    };
  });

  // Generate the prompt with structured format request
  const prompt = `
    Der Benutzer hat einen Talenttest durchgeführt und seine Top-5-Talente sind:
    ${top5TalentNames.map(t => `${t.name}`).join(', ')}.
    
    Interessen und Hobbys: ${userData.interests?.join(', ') || 'Keine Interessen angegeben'}.
    Bevorzugte Fächer: ${userData.favoriteSubjects?.join(', ') || 'Keine Fächer angegeben'}.

    Arbeitspräferenzen:
    - Bevorzugter Arbeitsort: ${userData.workPreferences?.location || 'Nicht angegeben'}
    - Arbeitszeiten: ${userData.workPreferences?.workingTime || 'Nicht angegeben'}
    - Wichtigkeit des Gehalts: ${userData.workPreferences?.salaryImportance || 'Nicht angegeben'}
    - Physische Arbeit: ${userData.workPreferences?.physicalWork || 'Nicht angegeben'}
    - Bevorzugte Sprache: ${userData.workPreferences?.language || 'Nicht angegeben'}

    Bitte empfehlen Sie drei Karrierewege und die dazu passenden relevanten Bildungspfade. Antworten Sie im folgenden Format:

    Karriere 1:
    - Name: [Name der Karriere]
    - Beschreibung: [Kurze Erklärung, warum diese Karriere zu den Talenten und Präferenzen des Benutzers passt]
    - Bildungspfad: [Relevante Bildungswege]

    Karriere 2:
    - Name: [Name der Karriere]
    - Beschreibung: [Kurze Erklärung, warum diese Karriere zu den Talenten und Präferenzen des Benutzers passt]
    - Bildungspfad: [Relevante Bildungswege]

    Karriere 3:
    - Name: [Name der Karriere]
    - Beschreibung: [Kurze Erklärung, warum diese Karriere zu den Talenten und Präferenzen des Benutzers passt]
    - Bildungspfad: [Relevante Bildungswege]
  `;

  console.log('Generated GPT prompt:', prompt);
  return prompt;
}