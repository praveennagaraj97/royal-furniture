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

export interface VerifyOTPTokenSet {
  refresh: string;
  access: string;
}

export interface VerifyOTPResponseData {
  user_id: string;
  email: string;
  phone_number: string;
  status: string;
  tokens: VerifyOTPTokenSet;
}

export type VerifyOTPResponse = BaseAPIResponse<VerifyOTPResponseData>;

export interface LoginWithPasswordResponseData {
  user_id: string;
  email: string;
  tokens: VerifyOTPTokenSet;
}

export type LoginWithPasswordResponse =
  BaseAPIResponse<LoginWithPasswordResponseData>;

export interface ForgotPasswordVerifyOTPResponseData {
  reset_token: string;
}

export type ForgotPasswordVerifyOTPResponse =
  BaseAPIResponse<ForgotPasswordVerifyOTPResponseData>;
