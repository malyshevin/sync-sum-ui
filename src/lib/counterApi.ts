import axios, { AxiosError } from 'axios';
import { API_CONFIG, ENDPOINTS } from './api';
import type { CounterResponse, ApiError } from '../types';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handling utility
const handleApiError = (error: AxiosError): ApiError => {
  if (error.response) {
    return {
      message: error.response.data?.message || 'Server error occurred',
      status: error.response.status,
    };
  } else if (error.request) {
    return {
      message: 'Network error - please check your connection',
    };
  } else {
    return {
      message: error.message || 'An unexpected error occurred',
    };
  }
};

// API functions
export const counterApi = {
  /**
   * Get current counter value
   */
  async getCounter(): Promise<CounterResponse> {
    try {
      const response = await apiClient.get<CounterResponse>(ENDPOINTS.COUNTER);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  /**
   * Increment counter by 1
   */
  async incrementCounter(): Promise<CounterResponse> {
    try {
      const response = await apiClient.post<CounterResponse>(ENDPOINTS.INCREMENT);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },
};

export { API_CONFIG };
