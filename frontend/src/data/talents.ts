export const talents = [
  { id: 1, name: "Analytisches Denken", description: "Die Fähigkeit, komplexe Probleme durch systematische Analyse zu lösen." },
  { id: 2, name: "Strategisches Planen", description: "Die Fähigkeit, langfristige Ziele zu setzen und durchdachte Schritte zu ihrer Verwirklichung zu entwickeln." },
  { id: 3, name: "Kreativität", description: "Die Fähigkeit, originelle und innovative Ideen zu entwickeln." },
  { id: 4, name: "Selbstdisziplin", description: "Die Fähigkeit, sich selbst zu motivieren und an Zielen konsequent zu arbeiten." },
  { id: 5, name: "Empathie", description: "Die Fähigkeit, die Gefühle und Bedürfnisse anderer zu verstehen und mit ihnen mitzufühlen." },
  { id: 6, name: "Kommunikationsstärke", description: "Die Fähigkeit, Informationen klar und effektiv zu vermitteln." },
  { id: 7, name: "Beziehungsaufbau", description: "Die Fähigkeit, langfristige, positive Beziehungen zu anderen Menschen zu knüpfen." },
  { id: 8, name: "Führungskompetenz", description: "Die Fähigkeit, Gruppen von Menschen zu führen und zu motivieren." },
  { id: 9, name: "Kontaktfreudigkeit", description: "Die Fähigkeit, leicht mit anderen Menschen in Kontakt zu treten." },
  { id: 10, name: "Konfliktlösungskompetenz", description: "Die Fähigkeit, Konflikte effektiv zu erkennen und zu lösen." },
  { id: 11, name: "Gerechtigkeitssinn", description: "Die Fähigkeit, sich für Fairness und Gleichheit einzusetzen." },
  { id: 12, name: "Wettkampfgeist", description: "Die Fähigkeit, sich in Wettbewerbssituationen zu beweisen und motiviert zu bleiben." },
  { id: 13, name: "Handwerkliches Geschick", description: "Die Fähigkeit, praktische Probleme mit handwerklichen Fähigkeiten zu lösen." },
  { id: 14, name: "Zielorientierung", description: "Die Fähigkeit, auf ein bestimmtes Ziel fokussiert hinzuarbeiten." },
  { id: 15, name: "Organisationstalent", description: "Die Fähigkeit, Aufgaben und Projekte effizient zu planen und zu verwalten." },
  { id: 16, name: "Neugierde", description: "Die Fähigkeit, ständig nach neuem Wissen zu suchen und offen für Neues zu sein." },
  { id: 17, name: "Hilfsbereitschaft", description: "Die Fähigkeit, anderen Menschen gerne zu helfen und sie zu unterstützen." },
  { id: 18, name: "Technisches Verständnis", description: "Die Fähigkeit, technische Konzepte und Systeme schnell zu verstehen." },
  { id: 19, name: "Selbstreflexion", description: "Die Fähigkeit, sich selbst zu analysieren und aus Fehlern zu lernen." },
  { id: 20, name: "Selbstbewusstsein", description: "Die Fähigkeit, Selbstvertrauen in die eigenen Fähigkeiten zu haben." },
  { id: 21, name: "Flexibilität", description: "Die Fähigkeit, sich schnell an neue Umstände anzupassen." },
  { id: 22, name: "Zuverlässigkeit", description: "Die Fähigkeit, Verantwortung zu übernehmen und Aufgaben verlässlich zu erfüllen." },
  { id: 23, name: "Eigeninitiative", description: "Die Fähigkeit, selbstständig zu handeln und Ideen umzusetzen." },
  { id: 24, name: "Verantwortungsbewusstsein", description: "Die Fähigkeit, Verantwortung für sich und andere zu übernehmen." },
  { id: 25, name: "Problemlösungskompetenz", description: "Die Fähigkeit, kreative und effiziente Lösungen für Herausforderungen zu finden." },
  { id: 26, name: "Positives Denken", description: "Die Fähigkeit, optimistisch zu bleiben, auch in schwierigen Situationen." },
  { id: 27, name: "Teamorientierung", description: "Die Fähigkeit, erfolgreich in einem Team zu arbeiten." },
  { id: 28, name: "Werteorientierung", description: "Die Fähigkeit, ethische Werte und Moral in Entscheidungsprozesse einzubringen." },
  { id: 29, name: "Menschenkenntnis", description: "Die Fähigkeit, andere Menschen richtig einzuschätzen und zu verstehen." },
  { id: 30, name: "Kritisches Denken", description: "Die Fähigkeit, Informationen zu hinterfragen und differenziert zu betrachten." },
  { id: 31, name: "Detailgenauigkeit", description: "Die Fähigkeit, genau und präzise zu arbeiten." },
  { id: 32, name: "Verhandlungsgeschick", description: "Die Fähigkeit, erfolgreiche Verhandlungen zu führen." },
  { id: 33, name: "Merkfähigkeit", description: "Die Fähigkeit, sich Informationen und Details langfristig zu merken." },
  { id: 34, name: "Durchsetzungsvermögen", description: "Die Fähigkeit, eigene Standpunkte klar und selbstbewusst zu vertreten." },
  { id: 35, name: "Musikalische Begabung", description: "Die Fähigkeit, Musik zu verstehen, zu spielen oder zu komponieren." },
  { id: 36, name: "Sportliche Begabung", description: "Die Fähigkeit, in körperlichen Aktivitäten exzellent zu sein." },
  { id: 37, name: "Künstlerische Begabung", description: "Die Fähigkeit, künstlerische Werke zu schaffen und ästhetisch zu denken." }
];

export function getTalentNameById(id: number): string | undefined {
  const talent = talents.find(talent => talent.id === id);
  return talent ? talent.name : undefined;
}

export function getTalentDescriptionById(id: number): string | undefined {
  const talent = talents.find(talent => talent.id === id);
  return talent ? talent.description : undefined;
}