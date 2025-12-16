import { validateEmail, validatePassword, validateRequired } from './common';

export const signupFormValidators = {
  firstName: (value: string) => validateRequired(value, 'First name'),
  lastName: (value: string) => validateRequired(value, 'Last name'),
  email: validateEmail,
  mobileNumber: (value: string) => {
    if (!value.trim()) {
      return 'Mobile number is required';
    }
    if (!/^[0-9+\-\s()]+$/.test(value)) {
      return 'Please enter a valid mobile number';
    }
    return undefined;
  },
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
