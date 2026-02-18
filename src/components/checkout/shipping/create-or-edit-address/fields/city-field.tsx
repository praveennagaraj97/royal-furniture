import { FormInput } from '@/components/shared/inputs/form-input';
import { ChangeEvent } from 'react';

interface CityFieldProps {
  value: string;
  error?: string;
  showError: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

export function CityField({
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
          Town / City<span className="text-red-500">*</span>
        </span>
      }
      type="text"
      placeholder="Town or City"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      showError={showError}
    />
  );
}
