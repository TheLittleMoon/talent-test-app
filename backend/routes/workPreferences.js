import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, workPreferences } = req.body;

  if (!email || !workPreferences) {
    return res.status(400).json({ message: 'Email and work preferences are required.' });
  }

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { workPreferences } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'Work preferences updated successfully.', user });
  } catch (error) {
    console.error('Error updating work preferences:', error);
    res.status(500).json({ message: 'Error updating work preferences.' });
  }
});

export default router;