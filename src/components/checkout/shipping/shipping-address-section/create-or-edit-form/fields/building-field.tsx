import { FormInput } from '@/components/shared/inputs/form-input';
import { ChangeEvent } from 'react';

interface BuildingFieldProps {
  value: string;
  error?: string;
  showError: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

export function BuildingField({
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
          Building Name/Villa No<span className="text-red-500">*</span>
        </span>
      }
      type="text"
      placeholder="e.g bay central west tower"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      showError={showError}
    />
  );
}
