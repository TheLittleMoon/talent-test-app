import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="bg-background min-h-screen flex flex-col justify-center p-6">
        {/* Title Section */}
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gradient mb-4 animate-fadeIn">
            Entdecke deine Talente
          </h1>
          <p className="text-xl font-light text-muted-foreground mb-8 animate-slideIn">
            Finde heraus, was dich einzigartig macht und welche Karrierewege zu dir passen.
          </p>
          {/* Start Test Button */}
          <Button 
            onClick={() => navigate('/personal-info')}
            className="bg-primary hover:bg-primary/90 text-white text-lg py-4 px-6 rounded-full"
          >
            Talenttest starten <ArrowRight className="ml-2" />
          </Button>
        </div>

        {/* Feature Boxes Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
          {[
            {
              title: 'Erkenne deine Stärken',
              icon: Brain,
              description: 'Identifiziere deine einzigartigen Fähigkeiten und Talente.'
            },
            {
              title: 'Entdecke Karriere-möglichkeiten',
              icon: Briefcase,
              description: 'Finde Berufe, die perfekt zu deinen Talenten passen.'
            },
            {
              title: 'Plane deine Bildung',
              icon: GraduationCap,
              description: 'Erhalte Vorschläge für Studiengänge und Weiterbildungen.'
            }
          ].map((item, index) => (
            <Card key={index} className="hover-scale">
              <div className="p-6 text-center flex flex-col items-center h-full">
                <item.icon className="mb-4 text-primary" size={48} />
                <h2 className="text-xl font-bold mb-2 break-words hyphens-auto">{item.title}</h2>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* How It Works Section */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-semibold mb-4">Wie es funktioniert</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {['Beantworte den Fragebogen', 'Erhalte deine Talenteanalyse', 'Entdecke passende Karrieren', 'Plane deine nächsten Schritte'].map(
              (step, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-primary mb-2">{index + 1}</div>
                  <p className="text-teal-700">{step}</p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Bereit, deine Talente zu entdecken?</h2>
          <Button 
            onClick={() => navigate('/personal-info')}
            className="bg-primary hover:bg-primary/90 text-white text-lg py-6 px-8 rounded-full"
          >
            Jetzt starten <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;