import React from 'react';
import { useCounter } from '../hooks/useCounter';
import { AppContainer } from './AppContainer';
import { AppHeader } from './AppHeader';
import { CounterValue } from './CounterValue';
import { ActionButtons } from './ActionButtons';
import { StatusInfo } from './StatusInfo';

export const App = React.memo(() => {
  const { counter, isLoading, error, increment, refresh } = useCounter();

  const handleIncrement = React.useCallback(async () => {
    await increment();
  }, [increment]);

  const handleRefresh = React.useCallback(async () => {
    await refresh();
  }, [refresh]);

  const errorMessage = React.useMemo(() => error?.message || null, [error?.message]);

  return (
    <AppContainer>
      <AppHeader />
      
      <CounterValue 
        value={counter} 
        isLoading={isLoading} 
        error={errorMessage} 
      />

      <ActionButtons 
        isLoading={isLoading}
        onIncrement={handleIncrement}
        onRefresh={handleRefresh}
      />

      <StatusInfo />
    </AppContainer>
  );
});

App.displayName = 'App';
