import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center p-6">
      {/* Title Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gradient">
          Entdecke deine Talente
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          Finde heraus, was dich einzigartig macht und welche Karrierewege zu dir passen.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="mt-8 flex space-x-4 justify-center">
          <a href="/personal-info" className="btn btn-primary hover-scale">
            Talenttest starten
          </a>
          <a href="/personal-info" className="btn btn-secondary hover-scale">
            Jetzt starten
          </a>
        </div>
      </div>

      {/* Feature Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-5xl">
        <div className="card hover-scale">
          <h2 className="font-semibold text-xl">Erkenne deine Stärken</h2>
          <p className="text-muted-foreground mt-2">
            Identifiziere deine einzigartigen Fähigkeiten und Talente.
          </p>
        </div>
        <div className="card hover-scale">
          <h2 className="font-semibold text-xl">Entdecke Karrieremöglichkeiten</h2>
          <p className="text-muted-foreground mt-2">
            Finde Berufe, die perfekt zu deinen Talenten passen.
          </p>
        </div>
        <div className="card hover-scale">
          <h2 className="font-semibold text-xl">Plane deine Bildung</h2>
          <p className="text-muted-foreground mt-2">
            Erhalte Vorschläge für Studiengänge und Weiterbildungen.
          </p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mt-16">
        <h3 className="text-2xl font-semibold">Wie es funktioniert</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6 text-center">
          <div>
            <span className="text-xl font-bold">1</span>
            <p className="text-muted-foreground">Beantworte den Fragebogen</p>
          </div>
          <div>
            <span className="text-xl font-bold">2</span>
            <p className="text-muted-foreground">Erhalte deine Talenteanalyse</p>
          </div>
          <div>
            <span className="text-xl font-bold">3</span>
            <p className="text-muted-foreground">Entdecke passende Karrieren</p>
          </div>
          <div>
            <span className="text-xl font-bold">4</span>
            <p className="text-muted-foreground">Plane deine nächsten Schritte</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;