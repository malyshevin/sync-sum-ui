import React from 'react';
import { CounterNumber } from './CounterNumber';
import { ErrorMessage } from './ErrorMessage';

interface CounterValueProps {
  value: number | null;
  isLoading: boolean;
  error: string | null;
}

export const CounterValue = React.memo<CounterValueProps>(({ value, isLoading, error }) => {
  return (
    <div className="mb-8">
      <CounterNumber 
        value={value} 
        isLoading={isLoading} 
        hasError={!!error} 
      />
      
      <ErrorMessage error={error} />
    </div>
  );
});

CounterValue.displayName = 'CounterValue';
