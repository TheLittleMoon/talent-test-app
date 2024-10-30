import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { callGPTApi } from './utils/utils.js';
import talentTestRoutes from './routes/talentTest.js';
import feedbackRoutes from './routes/feedback.js';
import gptRoutes from './routes/gpt.js';
import interestsRoutes from './routes/interests.js';
import personalInfoRoutes from './routes/personalInfo.js';
import subjectsRoutes from './routes/subjects.js';
import workPreferencesRoutes from './routes/workPreferences.js';
import resultsRoutes from './routes/results.js';
import { saveToDatabase } from './utils/saveToDatabase.js';

dotenv.config();
const app = express();

// CORS Configuration
const allowedOrigins = ['http://localhost:5173', 'https://www.berufsfinder.ai'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Middleware for JSON parsing
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.post('/api/talent-test/results', async (req, res) => {
  try {
    const { userInfo, prompt } = req.body;
    if (!prompt || !userInfo) {
      return res.status(400).json({ message: 'Missing required data: prompt or userInfo.' });
    }

    const gptResponse = await callGPTApi(prompt);
    const dbResponse = await saveToDatabase({ ...userInfo, gptResponse });

    res.status(200).json({ gptResponse, dbResponse });
  } catch (error) {
    console.error('Error handling results:', error);
    res.status(500).json({ message: 'Error processing results' });
  }
});

// Register Routes
app.use('/api/talent-test', talentTestRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/gpt', gptRoutes);
app.use('/api/interests', interestsRoutes);
app.use('/api/personal-info', personalInfoRoutes);
app.use('/api/subjects', subjectsRoutes);
app.use('/api/work-preferences', workPreferencesRoutes);
app.use('/api/results', resultsRoutes);

// Global Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Server Setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));