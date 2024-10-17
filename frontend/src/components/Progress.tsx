import React from 'react';

interface ProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];  // Array of step names
}

const Progress: React.FC<ProgressProps> = ({ currentStep, totalSteps, steps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-xl mt-8">
      <div className="relative h-2 bg-border rounded-full">
        <div
          className="absolute left-0 top-0 h-2 bg-primary rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="mt-2 flex justify-between text-sm text-center">
        {steps.map((step, index) => (
          <span
            key={index}
            className={`${
              index === currentStep - 1
                ? 'font-semibold text-primary'
                : 'text-muted-foreground'
            }`}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Progress;