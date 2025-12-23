import { useTranslations } from 'next-intl';
import {
  createValidateEmail,
  createValidatePassword,
  createValidatePhoneNumber,
  createValidateRequired,
} from './common';

type TranslationFunction = ReturnType<
  typeof useTranslations<'auth.validation'>
>;

export const createSignupFormValidators = (t: TranslationFunction) => {
  const validateEmail = createValidateEmail(t);
  const validatePassword = createValidatePassword(t);
  const validateRequired = createValidateRequired(t);
  const validatePhoneNumber = createValidatePhoneNumber(t);

  return {
    firstName: (value: string) =>
      validateRequired(value, t('firstNameRequired')),
    lastName: (value: string) => validateRequired(value, t('lastNameRequired')),
    email: validateEmail,
    mobileNumber: (value: string, countryCode?: string) =>
      validatePhoneNumber(value, countryCode || '+971', 'Mobile number'),
    password: validatePassword,
    confirmPassword: (value: string, password?: string) => {
      if (!value) {
        return t('reEnterPasswordRequired');
      }
      if (password && value !== password) {
        return t('passwordsDoNotMatch');
      }
      return undefined;
    },
  };
};
