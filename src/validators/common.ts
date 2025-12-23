import { isValidPhoneNumber } from 'libphonenumber-js';
import { useTranslations } from 'next-intl';

type TranslationFunction = ReturnType<
  typeof useTranslations<'auth.validation'>
>;

export const createValidateEmail = (t: TranslationFunction) => {
  return (value: string): string | undefined => {
    if (!value.trim()) {
      return t('emailRequired');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return t('emailInvalid');
    }
    return undefined;
  };
};

export const createValidatePassword = (t: TranslationFunction) => {
  return (value: string): string | undefined => {
    if (!value) {
      return t('passwordRequired');
    }
    if (value.length < 8) {
      return t('passwordMinLength');
    }
    return undefined;
  };
};

export const createValidateRequired = (t: TranslationFunction) => {
  return (value: string, fieldName: string): string | undefined => {
    if (!value.trim()) {
      // fieldName is already a translated string (e.g., t('firstNameRequired'))
      return fieldName;
    }
    return undefined;
  };
};

export const createValidatePhoneNumber = (t: TranslationFunction) => {
  return (
    phoneNumber: string,
    countryCode: string,
    fieldName: string = 'Mobile number'
  ): string | undefined => {
    if (!phoneNumber.trim()) {
      return t('mobileNumberRequired');
    }

    // Combine country code with phone number
    const fullPhoneNumber = `${countryCode} ${phoneNumber}`;

    try {
      // Use isValidPhoneNumber which is the recommended approach
      // It handles international numbers correctly when provided with country code
      if (isValidPhoneNumber(fullPhoneNumber)) {
        return undefined;
      }

      return t('mobileNumberInvalid');
    } catch {
      return t('mobileNumberInvalid');
    }
  };
};
