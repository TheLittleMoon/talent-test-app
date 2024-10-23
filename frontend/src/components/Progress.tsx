import React from 'react';

interface ProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

const Progress: React.FC<ProgressProps> = ({ currentStep, totalSteps, steps }) => {
  const progressPercentage = Math.min(Math.max((currentStep - 1) / (totalSteps - 1) * 100, 0), 100);

  return (
    <div className="w-full mt-8">
      <div className="relative h-2 bg-border rounded-full">
        <div
          className="absolute left-0 top-0 h-2 bg-primary rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="mt-2 flex justify-between text-sm">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-4 h-4 rounded-full mb-1 ${
                index < currentStep ? 'bg-primary' : 'bg-border'
              }`}
            ></div>
            <span
              className={`text-center ${
                index === currentStep - 1
                  ? 'font-semibold text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;