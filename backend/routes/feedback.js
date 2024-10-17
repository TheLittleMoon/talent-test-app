import express from 'express';
import Feedback from '../models/Feedback.js'; // Adjust path based on your structure

const router = express.Router();

// POST route to handle feedback submission
router.post('/', async (req, res) => {
  try {
    const { rating, feedbackText, email } = req.body;

    // Create a new feedback document
    const feedback = new Feedback({
      rating,
      feedbackText,
      email,
      date: new Date(),
    });

    // Save feedback to the database
    await feedback.save();

    // Send success response
    res.status(200).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ message: 'Error submitting feedback' });
  }
});

export default router;