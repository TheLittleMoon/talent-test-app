import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// This route will update the talent test results as they are submitted
router.post('/', async (req, res) => {
  const { email, talentTestResults } = req.body;

  if (!email || !talentTestResults) {
    return res.status(400).json({ message: 'Email and talent test results are required.' });
  }

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { talentTestResults } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'Talent test results updated successfully.', user });
  } catch (error) {
    console.error('Error updating talent test results:', error);
    res.status(500).json({ message: 'Error updating talent test results.' });
  }
});

export default router;