export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  allow_notification: boolean;
  country_id: string;
  latitude: string;
  longitude: string;
  onboard_complete: boolean;
}

export interface LoginWithPasswordPayload {
  email: string;
  password: string;
}

export interface UpdateProfilePayload {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

export interface VerifyOTPPayload {
  phone_number: string;
  code: string;
}

export interface EmailLoginPayload {
  email: string;
}

export interface PhoneLoginPayload {
  phone_number: string;
}

export interface VerifyOTPLoginPayload {
  email?: string;
  phone_number?: string;
  otp: string;
}

export interface ResendOTPPayload {
  email?: string;
  phone_number?: string;
}

export interface ForgotPasswordEmailPayload {
  email: string;
}

export interface ForgotPasswordSendOTPPayload {
  phone_number: string;
}

export interface ForgotPasswordVerifyOTPPayload {
  phone: string;
  otp: string;
}

export interface ForgotPasswordResendOTPPayload {
  phone_number: string;
}

export interface ForgotPasswordResetPasswordSMSPayload {
  reset_token: string;
  new_password: string;
  confirm_password: string;
}

export interface GuestSendOTPPayload {
  mobile_number: string;
  otp_type: 'guest_verify';
}

export interface GuestVerifyOTPPayload {
  mobile_number: string;
  otp: string;
  otp_type: 'guest_verify';
}
