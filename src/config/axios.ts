import { getAuthToken } from '@/utils';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';

export const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL!;

export const getAxiosConfig = (): AxiosRequestConfig => ({
  baseURL,
  timeout: 30000,
});

export const setupAxiosInterceptors = (instance: AxiosInstance): void => {
  // Add request interceptor to attach auth token
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getAuthToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptor to handle token invalidation
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (isTokenInvalidError(error)) {
        // Dispatch custom event to trigger logout
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('token-invalid'));
        }
      }
      return Promise.reject(error);
    }
  );
};

const isTokenInvalidError = (error: AxiosError): boolean => {
  // Check for 401 status
  if (error.response?.status === 401) {
    return true;
  }

  // Check for token_not_valid in the error message
  const responseData = error.response?.data;
  if (responseData && typeof responseData === 'object') {
    const message = (responseData as { message?: string }).message;
    if (typeof message === 'string' && message.includes('token_not_valid')) {
      return true;
    }

    // Check for token_not_valid in detail field
    const detail = (responseData as { detail?: string }).detail;
    if (typeof detail === 'string' && detail.includes('token_not_valid')) {
      return true;
    }
  }

  return false;
};

// FOR SWR

// Create a shared axios instance for apiFetcher with interceptors
const apiFetcherInstance = axios.create(getAxiosConfig());
setupAxiosInterceptors(apiFetcherInstance);

export const apiFetcher = async <T>(url: string): Promise<T> => {
  const response = await apiFetcherInstance.get<T>(url);
  return response.data;
};
