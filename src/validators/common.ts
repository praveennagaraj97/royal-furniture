import { isValidPhoneNumber } from 'libphonenumber-js';

export const validateEmail = (value: string): string | undefined => {
  if (!value.trim()) {
    return 'Email is required';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Please enter a valid email address';
  }
  return undefined;
};

export const validatePassword = (value: string): string | undefined => {
  if (!value) {
    return 'Password is required';
  }
  if (value.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  return undefined;
};

export const validateRequired = (
  value: string,
  fieldName: string
): string | undefined => {
  if (!value.trim()) {
    return `${fieldName} is required`;
  }
  return undefined;
};

export const validatePhoneNumber = (
  phoneNumber: string,
  countryCode: string,
  fieldName: string = 'Mobile number'
): string | undefined => {
  if (!phoneNumber.trim()) {
    return `${fieldName} is required`;
  }

  // Combine country code with phone number
  const fullPhoneNumber = `${countryCode}${phoneNumber}`;

  try {
    // Validate the phone number using libphonenumber-js
    if (!isValidPhoneNumber(fullPhoneNumber)) {
      return `Please enter a valid ${fieldName.toLowerCase()}`;
    }

    return undefined;
  } catch {
    return `Please enter a valid ${fieldName.toLowerCase()}`;
  }
};
