import User from '../models/User.js';  // Ensure you're using the correct User model

// Function to save user data and GPT response to MongoDB
export const saveToDatabase = async (userInfo) => {
  try {
    console.log('Saving user data and GPT response to MongoDB:', JSON.stringify(userInfo, null, 2));

    // Find and update the existing user record in the User model
    const updatedUser = await User.findOneAndUpdate(
      { email: userInfo.email },  // Use email to find the user
      {
        $set: {
          name: userInfo.name,
          age: userInfo.age,
          status: userInfo.status,  // Correct field name
          talentTestResults: userInfo.talentTestResults,  // Store talent test results
          interests: userInfo.interests,
          favoriteSubjects: userInfo.favoriteSubjects,
          workPreferences: userInfo.workPreferences,  // Ensure workPreferences is being set
          gptResponse: userInfo.gptResponse,  // Store GPT response
          updatedAt: new Date()  // Automatically set updatedAt
        }
      },
      { new: true, upsert: true }  // Create a new record if not found
    );

    console.log('Successfully saved user data to MongoDB:', updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Error saving user data to MongoDB:', error.message);
    throw new Error('Failed to save data to MongoDB');
  }
};