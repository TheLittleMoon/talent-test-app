import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  feedbackText: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Use default export for Feedback model
const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;