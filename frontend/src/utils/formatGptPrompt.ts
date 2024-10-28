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

     Bitte empfehlen Sie drei zukunftsrelevante Berufe, die stark mit der Entwicklung von KI und globalen Trends verbunden sind, und ergänzen Sie diese mit relevanten Bildungswegen. Antworten Sie im folgenden Format:

    Karriere 1:
    - Name: [Karrierename]
    - Beschreibung: [Warum diese Karriere zu den Talenten und Präferenzen passt]
    - Tägliche Aufgaben: [Kurzbeschreibung der täglichen Aufgaben in diesem Beruf]
    - Zukunftsperspektive: [Langfristige Projektionen, Relevanz und Expansion durch KI und Trends]
    - Einstiegsgehalt: [Durchschnittliches Einstiegsgehalt]
    - Karriereweg: [Mögliche Weiterentwicklung innerhalb des Berufs]
    - Schlüsselkompetenzen: [Kompetenzen, die in dieser Rolle entwickelt werden können]
    - Arbeitsumfeld: [Remote, vor Ort oder Hybrid]
    - Sektor und Nachfrage: [Industrien, in denen die Rolle stark nachgefragt ist]

    Karriere 2:
    - Name: [Karrierename]
    - Beschreibung: [Warum diese Karriere zu den Talenten und Präferenzen passt]
    - Tägliche Aufgaben: [Kurzbeschreibung der täglichen Aufgaben in diesem Beruf]
    - Zukunftsperspektive: [Langfristige Projektionen, Relevanz und Expansion durch KI und Trends]
    - Einstiegsgehalt: [Durchschnittliches Einstiegsgehalt]
    - Karriereweg: [Mögliche Weiterentwicklung innerhalb des Berufs]
    - Schlüsselkompetenzen: [Kompetenzen, die in dieser Rolle entwickelt werden können]
    - Arbeitsumfeld: [Remote, vor Ort oder Hybrid]
    - Sektor und Nachfrage: [Industrien, in denen die Rolle stark nachgefragt ist]

    Karriere 3:
    - Name: [Karrierename]
    - Beschreibung: [Warum diese Karriere zu den Talenten und Präferenzen passt]
    - Tägliche Aufgaben: [Kurzbeschreibung der täglichen Aufgaben in diesem Beruf]
    - Zukunftsperspektive: [Langfristige Projektionen, Relevanz und Expansion durch KI und Trends]
    - Einstiegsgehalt: [Durchschnittliches Einstiegsgehalt]
    - Karriereweg: [Mögliche Weiterentwicklung innerhalb des Berufs]
    - Schlüsselkompetenzen: [Kompetenzen, die in dieser Rolle entwickelt werden können]
    - Arbeitsumfeld: [Remote, vor Ort oder Hybrid]
    - Sektor und Nachfrage: [Industrien, in denen die Rolle stark nachgefragt ist]
`;

  console.log('Generated GPT prompt:', prompt);
  return prompt;
}