import { Heart } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onSelectStep?: (step: number) => void;
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
  onSelectStep,
}: ProgressIndicatorProps) {
  return (
    <div className="fixed top-4 left-4 z-40 flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-rose-200/80 rounded-full shadow-sm">
      <span className="text-xs font-semibold text-rose-600 tracking-tight flex items-center gap-1.5">
        <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
        Letter {currentStep} of {totalSteps} 💌
      </span>

      <div className="flex items-center gap-1 ml-1 border-l border-rose-200 pl-2">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isPassed = stepNum < currentStep;

          return (
            <button
              key={stepNum}
              onClick={() => onSelectStep && isPassed && onSelectStep(stepNum)}
              disabled={!isPassed && !isActive}
              title={`Letter ${stepNum}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-5 bg-rose-500 rounded-full shadow-sm shadow-rose-300'
                  : isPassed
                  ? 'bg-rose-300 hover:bg-rose-400 cursor-pointer'
                  : 'bg-rose-100'
              }`}
              aria-label={`Go to letter ${stepNum}`}
            />
          );
        })}
      </div>
    </div>
  );
}
