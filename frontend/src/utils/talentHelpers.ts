import { getTalentNameById } from '../data/talents';

// Function to map talent IDs to names and rank talents based on scores
export function mapTalentScoresToNames(talentTestResults: { [key: number]: number }) {
  // Convert the talentTestResults into an array of objects
  const talentEntries = Object.entries(talentTestResults).map(([id, score]) => ({
    id: Number(id),
    name: getTalentNameById(Number(id)),
    score,
  }));

  // Sort the talents by score in descending order
  talentEntries.sort((a, b) => b.score - a.score);

  // Extract top 5 and top 10 talents
  const top5 = talentEntries.slice(0, 5);
  const top10 = talentEntries.slice(0, 10);

  return { top5, top10 };
}