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

export interface VerifyOTPPayload {
  phone_number: string;
  code: string;
}
