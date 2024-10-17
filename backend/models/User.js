import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  age: { type: Number, default: null },
  status: { type: String, default: null },
  interests: { type: [String], default: [] },
  favoriteSubjects: { type: [String], default: [] },
  workPreferences: {
    location: { type: String, default: 'Not specified' },
    workingTime: { type: String, default: 'Not specified' },
    salaryImportance: { type: String, default: 'Not specified' },
    physicalWork: { type: String, default: 'Not specified' },
    language: { type: String, default: 'Not specified' }
  },
  talentTestResults: { type: Map, of: Number },  // Talent test results map
  gptResponse: { type: String },  // GPT response as a string
  updatedAt: { type: Date, default: Date.now }
});

// Update the `updatedAt` field on save
UserSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', UserSchema);
export default User;