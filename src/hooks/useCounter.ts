import { useState, useEffect, useCallback, useRef } from 'react';
import { counterApi, API_CONFIG } from '../lib/counterApi';
import type { ApiError, UseCounterReturn } from '../types';

export const useCounter = (): UseCounterReturn => {
  const [counter, setCounter] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);
  
  // Используем ref для предотвращения лишних обновлений при одинаковых значениях
  const lastCounterRef = useRef<number | null>(null);
  const lastErrorRef = useRef<string | null>(null);

  const fetchCounter = useCallback(async () => {
    try {
      setError(null);
      const response = await counterApi.getCounter();
      
      // Обновляем только если значение изменилось
      if (response.value !== lastCounterRef.current) {
        setCounter(response.value);
        lastCounterRef.current = response.value;
      }
    } catch (err) {
      const errorObj = err as ApiError;
      // Всегда устанавливаем ошибку при ошибке API
      setError(errorObj);
      lastErrorRef.current = errorObj.message;
      // НЕ сбрасываем счетчик при ошибке - сохраняем последнее известное значение
    } finally {
      setIsLoading(false);
    }
  }, []);

  const increment = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await counterApi.incrementCounter();
      setCounter(response.value);
      lastCounterRef.current = response.value;
    } catch (err) {
      const errorObj = err as ApiError;
      setError(errorObj);
      lastErrorRef.current = errorObj.message;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    await fetchCounter();
  }, [fetchCounter]);

  // Initial load
  useEffect(() => {
    fetchCounter();
  }, [fetchCounter]);

  // Auto-refresh every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCounter();
    }, API_CONFIG.REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [fetchCounter]);

  return {
    counter,
    isLoading,
    error,
    increment,
    refresh,
  };
};
