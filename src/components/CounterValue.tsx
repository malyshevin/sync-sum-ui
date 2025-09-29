import React from 'react';
import { AlertCircle } from 'lucide-react';
import clsx from 'clsx';

interface CounterValueProps {
  value: number;
  isLoading: boolean;
  error: string | null;
}

export const CounterValue = React.memo<CounterValueProps>(({ value, isLoading, error }) => {
  return (
    <div className="mb-8">
      <div 
        className={clsx(
          'counter-display transition-all duration-300',
          isLoading && 'animate-pulse-slow opacity-70',
          error && 'text-red-500'
        )}
      >
        {error ? 'Error' : value}
      </div>
      
      {error && (
        <div className="flex items-center justify-center text-red-600 text-sm mb-4">
          <AlertCircle className="w-4 h-4 mr-2" />
          {error}
        </div>
      )}
    </div>
  );
});

CounterValue.displayName = 'CounterValue';
