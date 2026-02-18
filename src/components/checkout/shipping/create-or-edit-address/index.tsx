'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { TextAreaFormInput } from '@/components/shared/inputs/text-area-input';
import {
  createAddressFormValidators,
  validateAddressForm,
} from '@/validators/address-form';
import { useTranslations } from 'next-intl';
import {
  FC,
  FormEvent,
  useMemo,
  useReducer,
  useState,
  type ChangeEvent,
  type ReactElement,
} from 'react';
import {
  FiArrowRight,
  FiBriefcase,
  FiHome,
  FiMapPin,
  FiMoreHorizontal,
} from 'react-icons/fi';
import { BuildingField } from './fields/building-field';
import { CityField } from './fields/city-field';
import { EmailField } from './fields/email-field';
import { NameField } from './fields/name-field';
import { PhoneField } from './fields/phone-field';
import { StreetField } from './fields/street-field';
import {
  AddressFormErrors,
  addressFormReducer,
  initialAddressFormState,
  type AddressFormData,
  type AddressType,
} from './reducer';

interface CreateOrEditAddressFormProps {
  onAddressSaved?: (data: AddressFormData) => void;
  onCancel?: () => void;
}

const addressTypeLabel: Record<AddressType, string> = {
  home: 'Home',
  work: 'Work',
  other: 'Other',
};

const addressTypeIcon: Record<AddressType, ReactElement> = {
  home: <FiHome className="h-4 w-4" />,
  work: <FiBriefcase className="h-4 w-4" />,
  other: <FiMoreHorizontal className="h-4 w-4" />,
};

export const CreateOrEditAddressForm: FC<CreateOrEditAddressFormProps> = ({
  onAddressSaved,
}) => {
  const [state, dispatch] = useReducer(
    addressFormReducer,
    initialAddressFormState,
  );
  const [countryCode, setCountryCode] = useState('+971');
  const tValidation = useTranslations('auth.validation');
  const addressFormValidators = useMemo(
    () => createAddressFormValidators(tValidation),
    [tValidation],
  );

  const hasErrors = useMemo(
    () => Object.keys(state.errors).length > 0,
    [state.errors],
  );

  const handleInputChange =
    (field: keyof AddressFormData) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'SET_FIELD_VALUE', field, value: event.target.value });
      // Validate on change for phone
      if (field === 'phone') {
        const error = addressFormValidators.phone(
          event.target.value,
          countryCode,
        );
        dispatch({
          type: 'SET_ERRORS',
          errors: { ...state.errors, phone: error },
        });
      }
    };

  const handleTextareaChange =
    (field: keyof AddressFormData) =>
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      dispatch({ type: 'SET_FIELD_VALUE', field, value: event.target.value });
    };

  const handleBlur = (field: keyof AddressFormErrors) => () => {
    dispatch({ type: 'SET_TOUCHED', field });
    // Validate the field on blur and update error state for that field
    let error: string | undefined = undefined;
    switch (field) {
      case 'name':
        error = addressFormValidators.name(state.formData.name);
        break;
      case 'phone':
        error = addressFormValidators.phone(state.formData.phone, countryCode);
        break;
      case 'email':
        error = addressFormValidators.email(state.formData.email);
        break;
      case 'streetAddress':
        error = addressFormValidators.streetAddress(
          state.formData.streetAddress,
        );
        break;
      case 'building':
        error = addressFormValidators.building(state.formData.building);
        break;
      case 'city':
        error = addressFormValidators.city(state.formData.city);
        break;
    }
    dispatch({
      type: 'SET_ERRORS',
      errors: { ...state.errors, [field]: error },
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: 'SET_IS_SUBMITTED', value: true });
    dispatch({ type: 'SET_ALL_TOUCHED' });

    const errors = validateAddressForm(
      state.formData,
      countryCode,
      tValidation,
    );
    dispatch({ type: 'SET_ERRORS', errors });

    if (Object.keys(errors).length > 0) {
      return;
    }

    dispatch({ type: 'SET_IS_SUBMITTING', value: true });

    if (onAddressSaved) {
      onAddressSaved(state.formData);
    }

    dispatch({ type: 'SET_IS_SUBMITTING', value: false });
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      return;
    }

    dispatch({ type: 'SET_IS_USING_LOCATION', value: true });

    navigator.geolocation.getCurrentPosition(
      () => {
        // We do not reverse-geocode here; this just represents
        // that a location has been requested and could be handled.
        dispatch({ type: 'SET_IS_USING_LOCATION', value: false });
      },
      () => {
        dispatch({ type: 'SET_IS_USING_LOCATION', value: false });
      },
    );
  };

  const showFieldError = (field: keyof AddressFormErrors) =>
    !!state.errors[field] && (!!state.touched[field] || state.isSubmitted);

  return (
    <section className="flex flex-col gap-4">
      <StaggerContainer
        mode="animate"
        staggerChildren={0.08}
        delayChildren={0.05}
        className="flex flex-col gap-4"
      >
        <StaggerItem type="slideUp" distance={20} duration={0.35}>
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-medium text-gray-900">
              Add New Address
            </h2>
          </div>
        </StaggerItem>

        <StaggerItem type="slideUp" distance={20} duration={0.35}>
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
            {(['home', 'work', 'other'] as AddressType[]).map((type) => {
              const isActive = state.formData.addressType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    dispatch({ type: 'SET_ADDRESS_TYPE', value: type })
                  }
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-medium transition-colors ${
                    isActive
                      ? 'border-deep-maroon text-deep-maroon'
                      : 'border-gray-200 text-gray-700 hover:border-deep-maroon hover:text-deep-maroon'
                  }`}
                >
                  <span
                    className={isActive ? 'text-deep-maroon' : 'text-gray-500'}
                  >
                    {addressTypeIcon[type]}
                  </span>
                  <span>{addressTypeLabel[type]}</span>
                </button>
              );
            })}
          </div>
        </StaggerItem>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <StaggerItem type="slideUp" distance={20} duration={0.35}>
            <NameField
              value={state.formData.name}
              onChange={handleInputChange('name')}
              onBlur={handleBlur('name')}
              error={state.errors.name}
              showError={showFieldError('name')}
            />
          </StaggerItem>

          <StaggerItem type="slideUp" distance={20} duration={0.35}>
            <PhoneField
              value={state.formData.phone}
              countryCode={countryCode}
              onCountryCodeChange={setCountryCode}
              onChange={handleInputChange('phone')}
              onBlur={handleBlur('phone')}
              validator={(value) =>
                addressFormValidators.phone(value, countryCode)
              }
              error={state.errors.phone}
              showError={
                !!state.errors.phone &&
                (!!state.touched.phone || state.isSubmitted)
              }
            />
          </StaggerItem>

          <StaggerItem type="slideUp" distance={20} duration={0.35}>
            <EmailField
              value={state.formData.email}
              onChange={handleInputChange('email')}
              onBlur={handleBlur('email')}
              error={state.errors.email}
              showError={showFieldError('email')}
            />
          </StaggerItem>

          <div className="my-2 w-full">
            <button
              type="button"
              onClick={handleUseMyLocation}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-deep-maroon px-4 h-12 text-xs sm:text-sm font-semibold text-deep-maroon hover:bg-deep-maroon hover:text-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={state.isUsingLocation}
            >
              <FiMapPin className="h-4 w-4" />
              {state.isUsingLocation
                ? 'Detecting location...'
                : 'Use my location'}
            </button>
          </div>

          <StaggerItem type="slideUp" distance={20} duration={0.35}>
            <StreetField
              value={state.formData.streetAddress}
              onChange={handleInputChange('streetAddress')}
              onBlur={handleBlur('streetAddress')}
              error={state.errors.streetAddress}
              showError={showFieldError('streetAddress')}
            />
          </StaggerItem>

          <StaggerItem type="slideUp" distance={20} duration={0.35}>
            <BuildingField
              value={state.formData.building}
              onChange={handleInputChange('building')}
              onBlur={handleBlur('building')}
              error={state.errors.building}
              showError={showFieldError('building')}
            />
          </StaggerItem>

          <StaggerItem type="slideUp" distance={20} duration={0.35}>
            <CityField
              value={state.formData.city}
              onChange={handleInputChange('city')}
              onBlur={handleBlur('city')}
              error={state.errors.city}
              showError={showFieldError('city')}
            />
          </StaggerItem>

          <StaggerItem type="slideUp" distance={20} duration={0.35}>
            <div className="space-y-1">
              <TextAreaFormInput
                label={
                  <label htmlFor="address-notes" className="form-input-label">
                    Order Notes (Optional)
                  </label>
                }
                id="address-notes"
                placeholder="Any additional information for delivery"
                value={state.formData.notes}
                onChange={handleTextareaChange('notes')}
              />
            </div>
          </StaggerItem>

          <StaggerItem type="slideUp" distance={20} duration={0.35}>
            <button
              type="submit"
              disabled={state.isSubmitting}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-deep-maroon px-4 py-2.5 text-sm sm:text-base font-semibold text-white hover:bg-[#6b0000] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              Add Address
              <FiArrowRight className="h-4 w-4" />
            </button>
          </StaggerItem>

          {hasErrors && state.isSubmitted && (
            <StaggerItem type="slideUp" distance={20} duration={0.35}>
              <p className="text-xs text-red-500">
                Please fill in all required fields marked with *.
              </p>
            </StaggerItem>
          )}
        </form>
      </StaggerContainer>
    </section>
  );
};

export default CreateOrEditAddressForm;
