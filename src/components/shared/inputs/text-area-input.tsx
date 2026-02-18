'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  type ChangeEvent,
  type FC,
  type ReactNode,
  type TextareaHTMLAttributes,
  useMemo,
} from 'react';

interface TextAreaFormInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  error?: string;
  showError?: boolean;
  validator?: (value: string) => string | undefined;
  rightElement?: ReactNode;
  containerClassName?: string;
  labelClassName?: string;
}

export const TextAreaFormInput: FC<TextAreaFormInputProps> = ({
  label,
  error,
  showError = false,
  validator,
  rightElement,
  containerClassName = '',
  labelClassName = '',
  className = '',
  id,
  value,
  onChange,
  ...inputProps
}) => {
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

  const isNumericType = inputProps.inputMode === 'numeric';
  const paddingClasses = rightElement
    ? isNumericType
      ? 'pr-12'
      : 'pe-12'
    : '';

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
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
        <textarea
          id={id}
          value={value}
          onChange={handleChange}
          {...inputProps}
          className={`form-input-base ${borderClasses} ${paddingClasses} ${className}`}
        />
        {/* No password toggle for textarea */}
        {rightElement && (
          <div
            className={`absolute top-1/2 -translate-y-1/2 ${
              isNumericType ? 'right-3' : 'end-3'
            }`}
          >
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
              className="text-xs text-red-500 mt-1"
            >
              {displayError}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
