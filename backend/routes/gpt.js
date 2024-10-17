import express from 'express';
import { callGPTApi } from '../utils/utils.js'; // Import the function that handles GPT API calls

const router = express.Router();

router.post('/', async (req, res) => {
  const { prompt } = req.body;

  try {
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Call the GPT API using the helper function from utils.js
    const gptResponse = await callGPTApi(prompt);

    // Send GPT's response back to the frontend
    res.json({ response: gptResponse });
  } catch (error) {
    console.error('Error calling GPT:', error);
    res.status(500).json({ error: 'Error calling GPT' });
  }
});

export default router;