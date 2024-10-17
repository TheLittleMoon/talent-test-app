import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { callGPTApi } from './utils/utils.js'; // or the correct path
import talentTestRoutes from './routes/talentTest.js'
import feedbackRoutes from './routes/feedback.js';
import gptRoutes from './routes/gpt.js';
import interestsRoutes from './routes/interests.js';
import personalInfoRoutes from './routes/personalInfo.js';
import subjectsRoutes from './routes/subjects.js';
import workPreferencesRoutes from './routes/workPreferences.js';
import resultsRoutes from './routes/results.js'
import { saveToDatabase } from './utils/saveToDatabase.js'; // Adjust the path as needed

dotenv.config();
const app = express();

// Setup CORS to allow requests from your frontend
app.use(cors({ origin: 'http://localhost:5173' }));

// Middleware for JSON parsing
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Handle /api/talent-test/results route
app.post('/api/talent-test/results', async (req, res) => {
  try {
    const { userInfo, prompt } = req.body;

    if (!prompt || !userInfo) {
      return res.status(400).json({ message: 'Missing required data: prompt or userInfo.' });
    }

    // Call GPT API to get career and education suggestions
    const gptResponse = await callGPTApi(prompt);

    // Save the user's data and GPT response to MongoDB (focus only on careers and education)
    const dbResponse = await saveToDatabase({ ...userInfo, gptResponse });

    // Return both the GPT response and the updated database entry
    res.status(200).json({ gptResponse, dbResponse });
  } catch (error) {
    console.error('Error handling results:', error);
    res.status(500).json({ message: 'Error processing results' });
  }
});

// Register new routes
app.use('/api/talent-test', talentTestRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/gpt', gptRoutes);
app.use('/api/interests', interestsRoutes);
app.use('/api/personal-info', personalInfoRoutes);
app.use('/api/subjects', subjectsRoutes); // Register subjects route
app.use('/api/work-preferences', workPreferencesRoutes);
app.use('/api/results', resultsRoutes)

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));