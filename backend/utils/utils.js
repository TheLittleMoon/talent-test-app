import axios from 'axios';
import User from '../models/User.js';  // Use User model instead of TalentTest

// Function to call GPT API
export const callGPTApi = async (prompt) => {
  try {
    console.log('Sending prompt to GPT:', prompt);

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4',  // Updated to the latest version of GPT
      messages: [
        { role: 'system', content: 'You are an assistant that provides career advice.' },  // Optional system message
        { role: 'user', content: prompt },  // User prompt formatted as a message
      ],
      max_tokens: 1000,  // Increased token limit to ensure more detailed responses
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const gptResponse = response.data.choices[0].message.content.trim();
    console.log('Received GPT response:', gptResponse);

    return gptResponse; 
  } catch (error) {
    console.error('Error calling GPT API:', error.response ? error.response.data : error.message);
    throw new Error('Failed to get response from GPT');
  }
};

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
          workPreferences: userInfo.workPreferences,
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