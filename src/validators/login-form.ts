import { useTranslations } from 'next-intl';
import { createValidateEmail, createValidateRequired } from './common';

type TranslationFunction = ReturnType<
  typeof useTranslations<'auth.validation'>
>;

export const createLoginFormValidators = (t: TranslationFunction) => {
  const validateEmail = createValidateEmail(t);
  const validateRequired = createValidateRequired(t);

  return {
    email: validateEmail,
    password: (value: string) => validateRequired(value, t('passwordRequired')),
  };
};
