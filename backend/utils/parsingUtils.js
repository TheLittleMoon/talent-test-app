// backend/utils/parsingUtils.js

/**
 * Parses the GPT response and splits it into career sections based on the word "Karriere".
 * 
 * @param {string} gptResponse - The raw GPT response as a string.
 * @returns {Array} - An array of parsed career objects.
 */
function parseCareers(gptResponse) {
    if (!gptResponse || typeof gptResponse !== 'string') {
      return [];
    }
  
    // Split the response into sections using "Karriere" as the keyword
    const careerSections = gptResponse.split(/Karriere \d+:/);
  
    // Remove any empty sections and map the data into career objects
    const careers = careerSections
      .filter(section => section.trim().length > 0)
      .map(section => {
        const [nameLine, descriptionLine, educationPathLine] = section.split('-').map(line => line.trim());
  
        // Return a career object
        return {
          name: nameLine ? nameLine.replace('Name: ', '').trim() : 'Unbekannte Karriere',
          description: descriptionLine ? descriptionLine.replace('Beschreibung: ', '').trim() : 'Keine Beschreibung',
          educationPath: educationPathLine ? educationPathLine.replace('Bildungspfad: ', '').trim() : 'Kein Bildungspfad'
        };
      });
  
    return careers;
  }
  
  module.exports = {
    parseCareers,
  };