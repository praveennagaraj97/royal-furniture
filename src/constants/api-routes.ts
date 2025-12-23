export const API_ROUTES = {
  AUTH: {
    REGISTER: '/users/auth/register/',
    VERIFY_OTP: '/users/auth/verify-otp/',
    RESEND_VERIFY_PHONE: '/users/auth/resend-verify-phone/',
    LOGIN_WITH_PASSWORD: '/users/login/login-with-password/',
    EMAIL_LOGIN: '/users/login/email-login/',
    PHONE_LOGIN: '/users/login/phone-login/',
    VERIFY_OTP_LOGIN: '/users/login/verify-otp-login/',
    RESEND_OTP: '/users/login/resend-otp/',
    FORGOT_PASSWORD_EMAIL: '/users/forgot-password/send-reset-link/',
    FORGOT_PASSWORD_SEND_OTP: '/users/forgot-password/send-otp/',
    FORGOT_PASSWORD_VERIFY_OTP: '/users/forgot-password/verify-otp/',
    FORGOT_PASSWORD_RESEND_OTP: '/users/forgot-password/resend-otp/',
    FORGOT_PASSWORD_RESET_PASSWORD_SMS:
      '/users/forgot-password/reset-password-sms/',
    REFRESH_TOKEN: '/users/token/refresh/',
    USER_VIEW: '/users/user-view/',
  },
} as const;
