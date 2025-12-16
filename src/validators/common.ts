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
