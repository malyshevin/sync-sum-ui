import React from 'react';
import clsx from 'clsx';

interface CounterNumberProps {
  value: number | null;
  isLoading: boolean;
  hasError: boolean;
}

export const CounterNumber = React.memo<CounterNumberProps>(({ value, isLoading, hasError }) => {
  return (
    <div 
      className={clsx(
        'counter-display transition-all duration-300',
        isLoading && 'animate-pulse-slow opacity-70',
        hasError && 'text-red-500'
      )}
    >
      {hasError ? 'Error' : (value !== null ? value : '—')}
    </div>
  );
});

CounterNumber.displayName = 'CounterNumber';