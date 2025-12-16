'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import {
  type FC,
  type InputHTMLAttributes,
  type ReactNode,
  useMemo,
  useState,
} from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showError?: boolean;
  validator?: (value: string) => string | undefined;
  rightElement?: ReactNode;
  containerClassName?: string;
  labelClassName?: string;
}

export const FormInput: FC<FormInputProps> = ({
  label,
  error,
  showError = false,
  validator,
  rightElement,
  containerClassName = '',
  labelClassName = '',
  className = '',
  type,
  id,
  value,
  onChange,
  ...inputProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = type === 'password';
  const inputType = isPasswordType && showPassword ? 'text' : type;

  const { validationError, isValid } = useMemo(() => {
    if (validator && value !== undefined && value !== null) {
      const error = validator(String(value));
      return {
        validationError: error,
        isValid: !error && String(value).length > 0,
      };
    }
    return {
      validationError: undefined,
      isValid: false,
    };
  }, [value, validator]);

  const hasValidationError = showError && validationError !== undefined;
  const hasReducerError = showError && error;
  const hasError = hasReducerError || hasValidationError;
  const displayError = hasValidationError ? validationError : error;

  let borderClasses = 'form-input-border-default';
  if (hasError) {
    borderClasses = 'form-input-border-error';
  } else if (isValid && validator && showError) {
    borderClasses = 'form-input-border-valid';
  }

  const paddingClasses = rightElement || isPasswordType ? 'pr-12' : '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle numeric-only input
    if (type === 'number' || inputProps.inputMode === 'numeric') {
      const value = e.target.value;
      // Allow empty string, numbers, and decimal point for number type
      if (type === 'number') {
        if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
          if (onChange) {
            onChange(e);
          }
        }
      } else {
        // For numeric inputMode, only allow digits
        if (value === '' || /^\d+$/.test(value)) {
          if (onChange) {
            onChange(e);
          }
        }
      }
    } else {
      if (onChange) {
        onChange(e);
      }
    }
  };

  return (
    <div className={containerClassName}>
      {label && (
        <label htmlFor={id} className={`form-input-label ${labelClassName}`}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={handleChange}
          {...inputProps}
          className={`form-input-base ${borderClasses} ${paddingClasses} ${className}`}
        />
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
        {rightElement && !isPasswordType && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      <AnimatePresence initial={false}>
        {hasError && displayError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="text-sm text-red-500 mt-1"
            >
              {displayError}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
