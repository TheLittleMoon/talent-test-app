import express from 'express';
import User from '../models/User.js';  // Assuming your User model is properly defined

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, age, status, email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // If the user does not exist, create a new user
      user = new User({
        name,
        age,
        status,
        email
      });
      await user.save();
      return res.status(201).json({ message: 'User created successfully', user });
    }

    // If user exists, update the information
    user.name = name;
    user.age = age;
    user.status = status;
    await user.save();

    return res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error handling personal info:', error);
    res.status(500).json({ message: 'Error processing personal info' });
  }
});

export default router;