import { FormInput } from '@/components/shared/inputs/form-input';
import { ChangeEvent } from 'react';

interface EmailFieldProps {
  value: string;
  error?: string;
  showError: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

export function EmailField({
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
          Email Address<span className="text-red-500">*</span>
        </span>
      }
      type="email"
      placeholder="Email Address"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      showError={showError}
    />
  );
}
