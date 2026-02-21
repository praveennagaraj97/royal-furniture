import { CountryPicker } from '@/components/shared/inputs/country-picker';
import { FormInput } from '@/components/shared/inputs/form-input';
import { ChangeEvent } from 'react';

interface PhoneFieldProps {
  value: string;
  countryCode: string;
  error?: string;
  showError: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onCountryCodeChange: (code: string) => void;
  validator: (value: string) => string | undefined;
}

export function PhoneField({
  value,
  countryCode,
  error,
  showError,
  onChange,
  onBlur,
  onCountryCodeChange,
  validator,
}: PhoneFieldProps) {
  return (
    <div className="w-full">
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
        htmlFor="address-phone"
      >
        Phone<span className="text-red-500">*</span>
      </label>
      <div className="flex items-start gap-2">
        <div className="shrink-0">
          <CountryPicker
            className="py-3"
            value={countryCode}
            onChange={onCountryCodeChange}
          />
        </div>
        <div className="flex-1">
          <FormInput
            id="address-phone"
            type="tel"
            inputMode="tel"
            placeholder="Enter your number"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            validator={validator}
            error={error}
            showError={showError}
          />
        </div>
      </div>
    </div>
  );
}
