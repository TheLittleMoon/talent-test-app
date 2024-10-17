import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, favoriteSubjects } = req.body;

  if (!email || !favoriteSubjects) {
    return res.status(400).json({ message: 'Email and favorite subjects are required.' });
  }

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { favoriteSubjects } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'Favorite subjects updated successfully.', user });
  } catch (error) {
    console.error('Error updating favorite subjects:', error);
    res.status(500).json({ message: 'Error updating favorite subjects.' });
  }
});

export default router;