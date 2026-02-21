import { FormInput } from '@/components/shared/inputs/form-input';
import { ChangeEvent } from 'react';

interface CityFieldProps {
  label: string;
  placeholder: string;
  required?: boolean;
  value: string;
  error?: string;
  showError: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

export function CityField({
  label,
  placeholder,
  required = false,
  value,
  error,
  showError,
  onChange,
  onBlur,
}: CityFieldProps) {
  return (
    <FormInput
      id="address-city"
      label={
        <span>
          {label}
          {required ? <span className="text-red-500">*</span> : null}
        </span>
      }
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      showError={showError}
    />
  );
}
