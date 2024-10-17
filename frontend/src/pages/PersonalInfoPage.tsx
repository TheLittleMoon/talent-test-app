import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../context/UserDataContext';
import Layout from '../components/Layout'; 
import Button from '../components/Button';
import Card from '../components/Card';
import Label from '../components/Label';
import Input from '../components/Input';
import Select from '../components/Select';
import Progress from '../components/Progress';
import { Mail, User, Calendar } from 'lucide-react'; 

const steps = ['Persönliche Daten', 'Talente', 'Hobbys', 'Fächer', 'Arbeitspräferenzen', 'Ergebnisse'];

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
    <Layout> {/* Wrapping in Layout */}
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold">Persönliche Daten</h2>
            <p className="text-muted-foreground">Fülle das Formular aus, um fortzufahren.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Dein Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" size={18} />
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dein Name"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="status">Aktueller Status</Label>
                <Select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required // Add required to Select
                >
                  <option value="" disabled>Wähle deinen aktuellen Status</option>
                  <option value="Student">Student</option>
                  <option value="Angestellt">Angestellt</option>
                </Select>
              </div>

              <div>
                <Label htmlFor="age">Alter</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" size={18} />
                  <Input
                    id="age"
                    type="number"
                    value={age || ''}
                    onChange={(e) => setAge(Number(e.target.value))}
                    placeholder="Dein Alter"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Adresse</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" size={18} />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Deine Email Adresse"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button type="submit" className="w-full">Weiter</Button> {/* Updated Button */}
            </div>
          </form>
        </Card>

        <div className="max-w-2xl mx-auto mt-8">
          {/* Application Progress Bar */}
          <Progress currentStep={1} totalSteps={6} steps={steps} /> {/* Use steps prop */}
        </div>
      </div>
    </Layout>
  );
};

export default PersonalInfoPage;