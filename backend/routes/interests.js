import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, interests } = req.body;

  if (!email || !interests) {
    return res.status(400).json({ message: 'Email and interests are required.' });
  }

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { interests } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'Interests updated successfully.', user });
  } catch (error) {
    console.error('Error updating interests:', error);
    res.status(500).json({ message: 'Error updating interests.' });
  }
});

export default router;