import { FormInput } from '@/components/shared/inputs/form-input';
import { ChangeEvent } from 'react';

interface BuildingFieldProps {
  label: string;
  placeholder: string;
  required?: boolean;
  value: string;
  error?: string;
  showError: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

export function BuildingField({
  label,
  placeholder,
  required = false,
  value,
  error,
  showError,
  onChange,
  onBlur,
}: BuildingFieldProps) {
  return (
    <FormInput
      id="address-building"
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
