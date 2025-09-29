// Global types for the application

export interface CounterResponse {
  value: number;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface UseCounterReturn {
  counter: number | null;
  isLoading: boolean;
  error: ApiError | null;
  increment: () => Promise<void>;
  refresh: () => Promise<void>;
}
