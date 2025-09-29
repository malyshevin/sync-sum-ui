import type { CounterResponse, ApiError } from '../types';

// API configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  REFRESH_INTERVAL: parseInt(import.meta.env.VITE_REFRESH_INTERVAL || '3000'),
} as const;

// API endpoints
export const ENDPOINTS = {
  COUNTER: '/counter',
  INCREMENT: '/counter/increment',
} as const;

export type { CounterResponse, ApiError };
