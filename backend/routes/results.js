import express from 'express';
import { callGPTApi } from '../utils/utils.js'; 
import { saveToDatabase } from '../utils/saveToDatabase.js';  // Correct import from saveToDatabase.js

const router = express.Router();

// This route handles the final GPT submission and database save
router.post('/', async (req, res) => {
  try {
    const { userInfo, prompt } = req.body;

    // Log the incoming request for debugging
    console.log('Request Body:', JSON.stringify(req.body, null, 2));

    if (!prompt || !userInfo) {
      console.error('Missing required data: prompt or userInfo');
      return res.status(400).json({ message: 'Missing required data: prompt or userInfo.' });
    }

    // Log the prompt and user info before calling GPT API
    console.log('Prompt:', prompt);
    console.log('User Info:', JSON.stringify(userInfo, null, 2));

    // Call GPT API with the generated prompt
    const gptResponse = await callGPTApi(prompt);

    // Log GPT response
    console.log('GPT Response:', gptResponse);

    

    // Log the user info that will be saved to the database
    console.log('Saving to database:', JSON.stringify(updatedUserInfo, null, 2));

    // Save user data and GPT response to MongoDB
    const dbResponse = await saveToDatabase(updatedUserInfo);

    // Log DB response
    console.log('Database Save Response:', dbResponse);

    // Return both GPT and DB responses, along with parsed careers
    res.status(200).json({ gptResponse, parsedCareers, dbResponse });
  } catch (error) {
    // Log detailed error
    console.error('Error processing results:', error.message);
    res.status(500).json({ message: 'Error processing results' });
  }
});

export default router;