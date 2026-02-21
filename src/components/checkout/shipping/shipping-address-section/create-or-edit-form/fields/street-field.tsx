import { FormInput } from '@/components/shared/inputs/form-input';
import { ChangeEvent } from 'react';

interface StreetFieldProps {
  value: string;
  error?: string;
  showError: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

export function StreetField({
  value,
  error,
  showError,
  onChange,
  onBlur,
}: StreetFieldProps) {
  return (
    <FormInput
      id="address-street"
      label={
        <span>
          Street Address<span className="text-red-500">*</span>
        </span>
      }
      type="text"
      placeholder="House number and Street name"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      showError={showError}
    />
  );
}
