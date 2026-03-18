import { Select, type SelectOption } from '@/components/shared/select';

interface RegionFieldProps {
  label: string;
  placeholder: string;
  value: string;
  options: SelectOption[];
  error?: string;
  showError: boolean;
  disabled?: boolean;
  onChange: (value: string | number) => void;
}

export function RegionField({
  label,
  placeholder,
  value,
  options,
  error,
  showError,
  disabled = false,
  onChange,
}: RegionFieldProps) {
  return (
    <Select
      label={label}
      placeholder={placeholder}
      value={value}
      options={options}
      onChange={onChange}
      error={error}
      showError={showError}
      disabled={disabled}
      id="address-region"
    />
  );
}
