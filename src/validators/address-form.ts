import {
  AddressFormData,
  AddressFormErrors,
} from '@/components/checkout/shipping/shipping-address-section/create-or-edit-form/reducer';
import { useTranslations } from 'next-intl';
import {
  createValidateEmail,
  createValidatePhoneNumber,
  createValidateRequired,
} from './common';

export const createAddressFormValidators = (
  t: ReturnType<typeof useTranslations<'auth.validation'>>,
) => {
  const validateRequired = createValidateRequired(t);
  const validateEmail = createValidateEmail(t);
  const validatePhoneNumber = createValidatePhoneNumber(t);

  return {
    name: (value: string) => validateRequired(value, t('nameRequired')),
    phone: (value: string, countryCode?: string) =>
      validatePhoneNumber(value, countryCode || '+971', 'Mobile number'),
    email: validateEmail,
    streetAddress: (value: string) =>
      validateRequired(value, t('streetAddressRequired')),
    building: (value: string) => validateRequired(value, t('buildingRequired')),
    city: (value: string) => validateRequired(value, t('cityRequired')),
  };
};

export const validateAddressForm = (
  formData: AddressFormData,
  countryCode: string = '+971',
  t?: ReturnType<typeof useTranslations<'auth.validation'>>,
): AddressFormErrors => {
  // If t is not provided, fallback to static messages
  const errors: AddressFormErrors = {};
  if (t) {
    const validators = createAddressFormValidators(t);
    if (validators.name(formData.name))
      errors.name = validators.name(formData.name);
    if (validators.phone(formData.phone, countryCode))
      errors.phone = validators.phone(formData.phone, countryCode);
    if (validators.email(formData.email))
      errors.email = validators.email(formData.email);
    if (validators.streetAddress(formData.streetAddress))
      errors.streetAddress = validators.streetAddress(formData.streetAddress);
    if (validators.building(formData.building))
      errors.building = validators.building(formData.building);
    if (validators.city(formData.city))
      errors.city = validators.city(formData.city);
  } else {
    if (!formData.name.trim()) errors.name = 'This field is required';
    if (!formData.phone.trim()) errors.phone = 'This field is required';
    if (!formData.email.trim()) errors.email = 'This field is required';
    if (!formData.streetAddress.trim())
      errors.streetAddress = 'This field is required';
    if (!formData.building.trim()) errors.building = 'This field is required';
    if (!formData.city.trim()) errors.city = 'This field is required';
  }
  return errors;
};
