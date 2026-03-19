import { FormInput } from '@/components/shared/inputs/form-input';
import { ChangeEvent } from 'react';

interface EmailFieldProps {
  label: string;
  placeholder: string;
  required?: boolean;
  value: string;
  error?: string;
  showError: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

export function EmailField({
  label,
  placeholder,
  required = false,
  value,
  error,
  showError,
  onChange,
  onBlur,
}: EmailFieldProps) {
  return (
    <FormInput
      id="address-email"
      label={
        <span>
          {label}
          {required ? <span className="text-red-500">*</span> : null}
        </span>
      }
      type="email"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      showError={showError}
    />
  );
}
