export interface BaseAPIResponse<T = unknown> {
  detail: string;
  message: string;
  data: T;
}

export interface RegisterResponseData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  status: string;
  allow_notification: boolean;
}

export type RegisterResponse = BaseAPIResponse<RegisterResponseData>;
