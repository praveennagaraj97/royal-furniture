import { FormInput } from '@/components/shared/inputs/form-input';
import { ChangeEvent } from 'react';

interface NameFieldProps {
  value: string;
  error?: string;
  showError: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

export function NameField({
  value,
  error,
  showError,
  onChange,
  onBlur,
}: NameFieldProps) {
  return (
    <FormInput
      id="address-name"
      label={
        <span>
          Name<span className="text-red-500">*</span>
        </span>
      }
      type="text"
      placeholder="Full Name"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      showError={showError}
    />
  );
}
