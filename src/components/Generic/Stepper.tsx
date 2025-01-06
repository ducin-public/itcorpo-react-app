import type { ReactNode } from 'react';

export type StepperProps = {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
  isStepClickable?: (step: number) => boolean;
};

export function Stepper({ 
  currentStep, 
  totalSteps, 
  onStepClick, 
  isStepClickable = () => false 
}: StepperProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
          const clickable = isStepClickable(step);
          
          return (
            <div
              key={step}
              className={`flex items-center ${
                step < totalSteps ? 'flex-1' : ''
              }`}
            >
              <div
                onClick={() => clickable && onStepClick?.(step)}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === currentStep
                    ? 'bg-emerald-600 text-white'
                    : step < currentStep
                    ? 'bg-emerald-600 text-white'
                    : clickable
                    ? 'border-2 border-emerald-600 text-emerald-600 bg-white'
                    : 'bg-gray-200'
                } ${
                  clickable 
                    ? 'cursor-pointer hover:ring-2 hover:ring-emerald-400' 
                    : 'cursor-default'
                }`}
              >
                {step}
              </div>
              {step < totalSteps && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step < currentStep
                      ? 'bg-emerald-600'
                      : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
