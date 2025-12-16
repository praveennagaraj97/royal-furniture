import { validateEmail, validateRequired } from './common';

export const loginFormValidators = {
  email: validateEmail,
  password: (value: string) => validateRequired(value, 'Password'),
};
