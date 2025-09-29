import React, { useCallback, useMemo } from 'react';
import { useCounter } from '../hooks/useCounter';
import { AppContainer } from './AppContainer';
import { AppHeader } from './AppHeader';
import { CounterValue } from './CounterValue';
import { ActionButtons } from './ActionButtons';
import { StatusInfo } from './StatusInfo';

export const CounterDisplay = React.memo(() => {
  const { counter, isLoading, error, increment, refresh } = useCounter();

  const handleIncrement = useCallback(async () => {
    await increment();
  }, [increment]);

  const handleRefresh = useCallback(async () => {
    await refresh();
  }, [refresh]);

  // Мемоизируем значение ошибки для предотвращения лишних перерисовок
  const errorMessage = useMemo(() => error?.message || null, [error?.message]);

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

CounterDisplay.displayName = 'CounterDisplay';