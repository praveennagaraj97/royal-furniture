import { type APIErrorResponse, type ParsedAPIError } from '@/types/error';
import { getAuthToken } from '@/utils';
import axios, { AxiosError } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL!;

export const apiFetcher = async <T>(url: string): Promise<T> => {
  const token = getAuthToken();

  try {
    const response = await axios.get<T>(`${baseURL}${url}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
      timeout: 30000,
    });

    return response.data;
  } catch (error) {
    // Parse error similar to BaseAPIService
    const axiosError = error as AxiosError<APIErrorResponse>;
    const response = axiosError.response?.data;
    const fieldErrors: Record<string, string> = {};
    let generalError: string | undefined;

    if (response && typeof response === 'object') {
      Object.entries(response).forEach(([field, messages]) => {
        if (field === 'error') {
          if (Array.isArray(messages) && messages.length > 0) {
            generalError = messages[0];
          } else if (typeof messages === 'string') {
            generalError = messages;
          }
        } else {
          if (Array.isArray(messages) && messages.length > 0) {
            fieldErrors[field] = messages[0];
          } else if (typeof messages === 'string') {
            fieldErrors[field] = messages;
          }
        }
      });
    }

    if (Object.keys(fieldErrors).length === 0 && !generalError) {
      if (axiosError.response?.status === 400) {
        generalError = 'Oops, something went wrong.';
      } else if (axiosError.response?.status === 401) {
        generalError = 'Oops, something went wrong.';
      } else if (axiosError.response?.status === 403) {
        generalError = 'Oops, something went wrong.';
      } else if (axiosError.response?.status === 404) {
        generalError = 'Oops, something went wrong.';
      } else if (axiosError.response?.status === 500) {
        generalError = 'Oops, something went wrong.';
      } else if (
        axiosError.message === 'Network Error' ||
        axiosError.code === 'ECONNABORTED'
      ) {
        generalError =
          'Network error. Please check your connection and try again.';
      } else {
        generalError = 'Oops, something went wrong.';
      }
    }

    const parsedError: ParsedAPIError = {
      fieldErrors,
      generalError,
    };

    throw parsedError;
  }
};
