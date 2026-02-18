'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { FormInput } from '@/components/shared/inputs/form-input';
import {
  FC,
  FormEvent,
  useMemo,
  useReducer,
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

const REQUIRED_MESSAGE = 'This field is required';

const validateAddressForm = (formData: AddressFormData): AddressFormErrors => {
  const errors: AddressFormErrors = {};

  if (!formData.name.trim()) errors.name = REQUIRED_MESSAGE;
  if (!formData.phone.trim()) errors.phone = REQUIRED_MESSAGE;
  if (!formData.email.trim()) errors.email = REQUIRED_MESSAGE;
  if (!formData.streetAddress.trim()) errors.streetAddress = REQUIRED_MESSAGE;
  if (!formData.building.trim()) errors.building = REQUIRED_MESSAGE;
  if (!formData.city.trim()) errors.city = REQUIRED_MESSAGE;

  return errors;
};

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

  const hasErrors = useMemo(
    () => Object.keys(state.errors).length > 0,
    [state.errors],
  );

  const handleInputChange =
    (field: keyof AddressFormData) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'SET_FIELD_VALUE', field, value: event.target.value });
    };

  const handleTextareaChange =
    (field: keyof AddressFormData) =>
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      dispatch({ type: 'SET_FIELD_VALUE', field, value: event.target.value });
    };

  const handleBlur = (field: keyof AddressFormErrors) => () => {
    dispatch({ type: 'SET_TOUCHED', field });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: 'SET_IS_SUBMITTED', value: true });

    const errors = validateAddressForm(state.formData);
    dispatch({ type: 'SET_ERRORS', errors });

    if (Object.keys(errors).length > 0) {
      return;
    }

    dispatch({ type: 'SET_IS_SUBMITTING', value: true });

    // In a real implementation, this is where an API call would go.
    // For now, we simply notify the parent and reset the form.
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
    <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
      <StaggerContainer
        mode="animate"
        staggerChildren={0.08}
        delayChildren={0.05}
        className="space-y-4"
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

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <StaggerItem type="slideUp" distance={20} duration={0.35}>
            <FormInput
              id="address-name"
              label="Name*"
              type="text"
              placeholder="Full Name"
              value={state.formData.name}
              onChange={handleInputChange('name')}
              onBlur={handleBlur('name')}
              error={state.errors.name}
              showError={showFieldError('name')}
              containerClassName="w-full"
              className="bg-[#f8f8f8] border-0 rounded-lg placeholder:text-gray-400"
            />
          </StaggerItem>

          <StaggerItem type="slideUp" distance={20} duration={0.35}>
            <FormInput
              id="address-phone"
              label="Phone*"
              type="tel"
              inputMode="tel"
              placeholder="Enter your number"
              value={state.formData.phone}
              onChange={handleInputChange('phone')}
              onBlur={handleBlur('phone')}
              error={state.errors.phone}
              showError={showFieldError('phone')}
              containerClassName="w-full"
              className="bg-[#f8f8f8] border-0 rounded-lg placeholder:text-gray-400"
            />
          </StaggerItem>

          <StaggerItem type="slideUp" distance={20} duration={0.35}>
            <FormInput
              id="address-email"
              label="Email Address*"
              type="email"
              placeholder="Email Address"
              value={state.formData.email}
              onChange={handleInputChange('email')}
              onBlur={handleBlur('email')}
              error={state.errors.email}
              showError={showFieldError('email')}
              containerClassName="w-full"
              className="bg-[#f8f8f8] border-0 rounded-lg placeholder:text-gray-400"
            />
          </StaggerItem>

          <StaggerItem type="slideUp" distance={20} duration={0.35}>
            <FormInput
              id="address-street"
              label="Street Address*"
              type="text"
              placeholder="House number and Street name"
              value={state.formData.streetAddress}
              onChange={handleInputChange('streetAddress')}
              onBlur={handleBlur('streetAddress')}
              error={state.errors.streetAddress}
              showError={showFieldError('streetAddress')}
              containerClassName="w-full"
              className="bg-[#f8f8f8] border-0 rounded-lg placeholder:text-gray-400"
            />
          </StaggerItem>

          <StaggerItem type="slideUp" distance={20} duration={0.35}>
            <FormInput
              id="address-building"
              label="Building Name/Villa No*"
              type="text"
              placeholder="e.g bay central west tower"
              value={state.formData.building}
              onChange={handleInputChange('building')}
              onBlur={handleBlur('building')}
              error={state.errors.building}
              showError={showFieldError('building')}
              containerClassName="w-full"
              className="bg-[#f8f8f8] border-0 rounded-lg placeholder:text-gray-400"
            />
          </StaggerItem>

          <StaggerItem type="slideUp" distance={20} duration={0.35}>
            <div className="flex flex-col sm:flex-row gap-3">
              <FormInput
                id="address-city"
                label="Town / City*"
                type="text"
                placeholder="Town or City"
                value={state.formData.city}
                onChange={handleInputChange('city')}
                onBlur={handleBlur('city')}
                error={state.errors.city}
                showError={showFieldError('city')}
                containerClassName="flex-1"
                className="bg-[#f8f8f8] border-0 rounded-lg placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={handleUseMyLocation}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-deep-maroon px-4 py-2 text-xs sm:text-sm font-semibold text-deep-maroon hover:bg-deep-maroon hover:text-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={state.isUsingLocation}
              >
                <FiMapPin className="h-4 w-4" />
                {state.isUsingLocation
                  ? 'Detecting location...'
                  : 'Use my location'}
              </button>
            </div>
          </StaggerItem>

          <StaggerItem type="slideUp" distance={20} duration={0.35}>
            <div className="space-y-1">
              <label htmlFor="address-notes" className="form-input-label">
                Order Notes (Optional)
              </label>
              <textarea
                id="address-notes"
                placeholder="Any additional information for delivery"
                value={state.formData.notes}
                onChange={handleTextareaChange('notes')}
                className="w-full min-h-24 rounded-lg bg-[#f8f8f8] border-0 px-3 py-2 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-deep-maroon"
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
