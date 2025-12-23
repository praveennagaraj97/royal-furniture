export const API_ROUTES = {
  AUTH: {
    REGISTER: '/users/auth/register/',
    VERIFY_OTP: '/users/auth/verify-otp/',
    RESEND_VERIFY_PHONE: '/users/auth/resend-verify-phone/',
    LOGIN_WITH_PASSWORD: '/users/login/login-with-password/',
  },
} as const;
