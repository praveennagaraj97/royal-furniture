import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateRequired,
} from './common';

export const signupFormValidators = {
  firstName: (value: string) => validateRequired(value, 'First name'),
  lastName: (value: string) => validateRequired(value, 'Last name'),
  email: validateEmail,
  mobileNumber: (value: string, countryCode?: string) =>
    validatePhoneNumber(value, countryCode || '+971', 'Mobile number'),
  password: validatePassword,
  confirmPassword: (value: string, password?: string) => {
    if (!value) {
      return 'Please re-enter your password';
    }
    if (password && value !== password) {
      return 'Passwords do not match';
    }
    return undefined;
  },
};
