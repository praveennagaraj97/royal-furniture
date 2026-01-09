import { getAxiosConfig, setupAxiosInterceptors } from '@/config/axios';
import { type ParsedAPIError } from '@/types/error';
import axios, { AxiosInstance } from 'axios';

export class BaseAPIService {
  protected http: AxiosInstance;

  constructor() {
    this.http = axios.create(getAxiosConfig());
    setupAxiosInterceptors(this.http);
  }

  protected formDataBuilder(payload: Record<string, unknown>): FormData {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined) {
        return;
      }

      if (value instanceof File || value instanceof Blob) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (item instanceof File || item instanceof Blob) {
            formData.append(key, item);
          } else if (item !== undefined) {
            formData.append(`${key}[${index}]`, String(item));
          }
        });
      } else if (typeof value === 'object' && value !== null) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });

    return formData;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected parseError(error: any): ParsedAPIError {
    const response = error.response?.data;
    const fieldErrors: Record<string, string> = {};
    let generalError: string | undefined;

    if (response && typeof response === 'object') {
      // Handle API base response shape:
      // { version, detail, message, data, meta }
      // Use `message` as a general error when present and not a success.
      if (
        typeof (response as { message?: unknown }).message === 'string' &&
        (response as { detail?: unknown }).detail !== 'success'
      ) {
        generalError = (response as { message: string }).message;
      }

      Object.entries(response).forEach(([field, messages]) => {
        // Skip known non-field keys from the structured API response
        if (
          field === 'message' ||
          field === 'detail' ||
          field === 'data' ||
          field === 'meta'
        ) {
          return;
        }

        if (field === 'error') {
          // Handle general error field
          if (Array.isArray(messages) && messages.length > 0) {
            generalError = messages[0];
          } else if (typeof messages === 'string') {
            generalError = messages;
          }
        } else {
          // Handle field-specific errors
          if (Array.isArray(messages) && messages.length > 0) {
            fieldErrors[field] = messages[0];
          } else if (typeof messages === 'string') {
            fieldErrors[field] = messages;
          }
        }
      });
    }

    if (Object.keys(fieldErrors).length === 0 && !generalError) {
      if (error.response?.status === 400) {
        generalError = 'Oops, something went wrong.';
      } else if (error.response?.status === 401) {
        generalError = 'Oops, something went wrong.';
      } else if (error.response?.status === 403) {
        generalError = 'Oops, something went wrong.';
      } else if (error.response?.status === 404) {
        generalError = 'Oops, something went wrong.';
      } else if (error.response?.status === 500) {
        generalError = 'Oops, something went wrong.';
      } else if (
        error.message === 'Network Error' ||
        error.code === 'ECONNABORTED'
      ) {
        generalError =
          'Network error. Please check your connection and try again.';
      } else {
        generalError = 'Oops, something went wrong.';
      }
    }

    return {
      fieldErrors,
      generalError,
    };
  }

  getLocaleAndCountryHeader = (locale?: string, country?: string) => {
    const headers: Record<string, string> = {};

    if (locale) {
      headers['locale'] = locale;
    }
    if (country) {
      headers['country'] = country;
    }

    return headers;
  };
}
