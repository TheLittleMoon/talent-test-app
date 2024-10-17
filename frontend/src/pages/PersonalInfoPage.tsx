import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../context/UserDataContext';

const PersonalInfoPage: React.FC = () => {
  const { userData, setUserData } = useUserData();
  const [name, setName] = useState(userData.name || '');
  const [age, setAge] = useState<number | undefined>(userData.age || undefined);
  const [status, setStatus] = useState(userData.status || '');
  const [email, setEmail] = useState(userData.email || '');

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Log the data before submission
    console.log('Personal Info Form Submitted:', { name, age, status, email });

    // Update the context with the entered personal info
    setUserData({
      ...userData,
      name,
      age,
      status,
      email
    });

    // Send the personal info data to the backend
    try {
      const response = await fetch('http://localhost:3000/api/personal-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          age,
          status,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error('Error submitting personal info');
      }

      console.log('Personal info saved to backend successfully');

      // Navigate to the Talent Test page
      navigate('/talente-test');
    } catch (error) {
      console.error('Error submitting personal info:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Persönliche Daten</h2>

        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label htmlFor="name" className="label">Dein Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="Dein vollständiger Name"
              required
            />
          </div>

          {/* Age Input */}
          <div className="mb-4">
            <label htmlFor="age" className="label">Alter</label>
            <input
              id="age"
              type="number"
              value={age || ''}
              onChange={(e) => setAge(Number(e.target.value))}
              className="input"
              placeholder="Dein Alter"
              required
            />
          </div>

          {/* Status Dropdown */}
          <div className="mb-4">
            <label htmlFor="status" className="label">Aktueller Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="input"
              required
            >
              <option value="" disabled>Wähle deinen aktuellen Status</option>
              <option value="Student">Student</option>
              <option value="Angestellt">Angestellt</option>
            </select>
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email" className="label">Email Adresse</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="Deine Email Adresse"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Weiter
          </button>
        </form>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md mt-8">
        <div className="flex justify-between text-sm">
          <span className="font-semibold">Persönliche Daten</span>
          <span>Talente</span>
          <span>Hobbys</span>
          <span>Fächer</span>
          <span>Arbeitspräferenzen</span>
          <span>Ergebnisse</span>
        </div>
        <div className="relative mt-2 h-2 bg-border rounded-full">
          <div className="absolute left-0 top-0 h-2 bg-primary rounded-full" style={{ width: '16%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoPage;