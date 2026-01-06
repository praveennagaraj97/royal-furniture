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

export interface RefreshTokenResponseData {
  access: string;
  refresh: string;
}

export type RefreshTokenResponse = BaseAPIResponse<RefreshTokenResponseData>;

export interface User {
  id: number;
  uid: string;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  allow_notification: boolean;
  status: string;
  profile_image_url: string | null;
}

export type UserProfileResponse = BaseAPIResponse<User>;

export interface CountryLanguage {
  id: number;
  country_name: string;
  country_code: string;
  language: string;
  language_code: string;
  currency: string;
  image: string;
}

export type CountryLanguageOptionsResponse = BaseAPIResponse<CountryLanguage[]>;
