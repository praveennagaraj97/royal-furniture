'use client';

import { VerifyPhone } from '@/components/auth/verify-phone';
import { CountryPicker } from '@/components/shared/inputs/country-picker';
import { FormInput } from '@/components/shared/inputs/form-input';
import { useToast } from '@/contexts/toast-context';
import { authService } from '@/services/api/auth-service';
import type { ParsedAPIError } from '@/types/error';
import { signupFormValidators } from '@/validators';
import { motion, type Variants } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import {
  useEffect,
  useReducer,
  useState,
  type ChangeEvent,
  type FC,
  type FormEvent,
} from 'react';
import {
  initialState,
  signupReducer,
  type SignupFormData,
  type SignupFormErrors,
} from './reducer';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

interface SignupFormProps {
  onFormStateChange?: (hasValues: boolean) => void;
  onClose?: () => void;
}

const SignupForm: FC<SignupFormProps> = ({ onFormStateChange, onClose }) => {
  const [state, dispatch] = useReducer(signupReducer, initialState);
  const { showError } = useToast();
  const [showVerifyPhone, setShowVerifyPhone] = useState(false);

  // Notify parent when form state changes
  useEffect(() => {
    if (onFormStateChange) {
      const hasValues =
        state.formData.firstName.trim() !== '' ||
        state.formData.lastName.trim() !== '' ||
        state.formData.email.trim() !== '' ||
        state.formData.mobileNumber.trim() !== '' ||
        state.formData.password.trim() !== '' ||
        state.formData.confirmPassword.trim() !== '';
      onFormStateChange(hasValues);
    }
  }, [
    state.formData.firstName,
    state.formData.lastName,
    state.formData.email,
    state.formData.mobileNumber,
    state.formData.password,
    state.formData.confirmPassword,
    onFormStateChange,
  ]);

  const handleFieldChange =
    (field: keyof SignupFormData) => (e: ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'SET_FIELD_VALUE', field, value: e.target.value });
    };

  const handleBlur = (field: keyof SignupFormData) => () => {
    dispatch({ type: 'SET_TOUCHED', field });
  };

  const validateForm = (): boolean => {
    const newErrors: SignupFormErrors = {};
    const firstNameError = signupFormValidators.firstName(
      state.formData.firstName
    );
    const lastNameError = signupFormValidators.lastName(
      state.formData.lastName
    );
    const emailError = signupFormValidators.email(state.formData.email);
    const mobileNumberError = signupFormValidators.mobileNumber(
      state.formData.mobileNumber,
      state.countryCode
    );
    const passwordError = signupFormValidators.password(
      state.formData.password
    );
    const confirmPasswordError = signupFormValidators.confirmPassword(
      state.formData.confirmPassword,
      state.formData.password
    );

    if (firstNameError) newErrors.firstName = firstNameError;
    if (lastNameError) newErrors.lastName = lastNameError;
    if (emailError) newErrors.email = emailError;
    if (mobileNumberError) newErrors.mobileNumber = mobileNumberError;
    if (passwordError) newErrors.password = passwordError;
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    dispatch({ type: 'SET_ERRORS', errors: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const mapAPIErrorToFormField = (
    apiField: string
  ): keyof SignupFormErrors | null => {
    const fieldMap: Record<string, keyof SignupFormErrors> = {
      first_name: 'firstName',
      last_name: 'lastName',
      email: 'email',
      phone_number: 'mobileNumber',
      password: 'password',
      confirm_password: 'confirmPassword',
    };
    return fieldMap[apiField] || null;
  };

  const requestLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  };

  const handleSignupSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'SET_IS_SUBMITTED', value: true });
    dispatch({ type: 'SET_ALL_TOUCHED' });

    // Validate before submitting
    if (!validateForm()) {
      return;
    }

    dispatch({ type: 'SET_IS_LOADING', value: true });

    try {
      // Request user location
      let latitude = '';
      let longitude = '';

      try {
        const position = await requestLocation();
        latitude = position.coords.latitude.toString();
        longitude = position.coords.longitude.toString();
        dispatch({
          type: 'SET_LOCATION',
          latitude,
          longitude,
        });
      } catch {
        // User rejected or location unavailable - don't proceed with registration
        dispatch({ type: 'SET_IS_LOADING', value: false });
        showError('Location access is required to complete registration');
        return;
      }

      await authService.register({
        first_name: state.formData.firstName,
        last_name: state.formData.lastName,
        email: state.formData.email,
        phone_number: `${state.countryCode} ${state.formData.mobileNumber}`,
        password: state.formData.password,
        confirm_password: state.formData.confirmPassword,
        allow_notification: false,
        country_id: '1',
        latitude,
        longitude,
        onboard_complete: false,
      });

      // Show verify phone modal after successful registration
      setShowVerifyPhone(true);
    } catch (error) {
      const parsedError = error as ParsedAPIError;

      // Show general error using toast if present
      if (parsedError.generalError) {
        showError(parsedError.generalError);
      }

      // Map API field errors to form field errors
      const newErrors: SignupFormErrors = { ...state.errors };
      Object.entries(parsedError.fieldErrors).forEach(
        ([apiField, errorMessage]) => {
          const formField = mapAPIErrorToFormField(apiField);
          if (formField) {
            newErrors[formField] = errorMessage;
          }
        }
      );

      dispatch({ type: 'SET_ERRORS', errors: newErrors });
    } finally {
      dispatch({ type: 'SET_IS_LOADING', value: false });
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4"
    >
      <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4">
        <motion.div variants={itemVariants}>
          <FormInput
            id="firstName"
            type="text"
            placeholder="First name"
            value={state.formData.firstName}
            onChange={handleFieldChange('firstName')}
            onBlur={handleBlur('firstName')}
            validator={signupFormValidators.firstName}
            error={state.errors.firstName}
            showError={!!state.touched.firstName || state.isSubmitted}
            containerClassName="w-full"
            className="bg-[#f8f8f8] border-0 rounded-lg text-gray-900 placeholder:text-gray-400"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <FormInput
            id="lastName"
            type="text"
            placeholder="Last name"
            value={state.formData.lastName}
            onChange={handleFieldChange('lastName')}
            onBlur={handleBlur('lastName')}
            validator={signupFormValidators.lastName}
            error={state.errors.lastName}
            showError={!!state.touched.lastName || state.isSubmitted}
            containerClassName="w-full"
            className="bg-[#f8f8f8] border-0 rounded-lg text-gray-900 placeholder:text-gray-400"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <FormInput
            id="email"
            type="email"
            placeholder="Email ID"
            value={state.formData.email}
            onChange={handleFieldChange('email')}
            onBlur={handleBlur('email')}
            validator={signupFormValidators.email}
            error={state.errors.email}
            showError={!!state.touched.email || state.isSubmitted}
            containerClassName="w-full"
            className="bg-[#f8f8f8] border-0 rounded-lg text-gray-900 placeholder:text-gray-400"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <div className="w-full">
            <div className="flex items-start gap-2">
              <div className="shrink-0">
                <CountryPicker
                  className="py-3"
                  value={state.countryCode}
                  onChange={(dialCode) =>
                    dispatch({ type: 'SET_COUNTRY_CODE', value: dialCode })
                  }
                />
              </div>
              <div className="flex-1">
                <FormInput
                  id="mobileNumber"
                  type="tel"
                  inputMode="numeric"
                  placeholder="Mobile Number"
                  value={state.formData.mobileNumber}
                  onChange={handleFieldChange('mobileNumber')}
                  onBlur={handleBlur('mobileNumber')}
                  validator={(value) =>
                    signupFormValidators.mobileNumber(value, state.countryCode)
                  }
                  error={state.errors.mobileNumber}
                  showError={!!state.touched.mobileNumber || state.isSubmitted}
                  containerClassName="w-full"
                  className="bg-[#f8f8f8] border-0 rounded-lg text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div variants={itemVariants}>
          <FormInput
            id="password"
            type="password"
            placeholder="Password"
            value={state.formData.password}
            onChange={handleFieldChange('password')}
            onBlur={handleBlur('password')}
            validator={signupFormValidators.password}
            error={state.errors.password}
            showError={!!state.touched.password || state.isSubmitted}
            containerClassName="w-full"
            className="bg-[#f8f8f8] border-0 rounded-lg text-gray-900 placeholder:text-gray-400"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <FormInput
            id="confirmPassword"
            type="password"
            placeholder="Re-enter Password"
            value={state.formData.confirmPassword}
            onChange={handleFieldChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            validator={(value) =>
              signupFormValidators.confirmPassword(
                value,
                state.formData.password
              )
            }
            error={state.errors.confirmPassword}
            showError={!!state.touched.confirmPassword || state.isSubmitted}
            containerClassName="w-full"
            className="bg-[#f8f8f8] border-0 rounded-lg text-gray-900 placeholder:text-gray-400"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <button
            type="submit"
            disabled={state.isLoading}
            className="w-full bg-deep-maroon text-white py-3 rounded-lg font-semibold text-base hover:bg-[#6b0000] 
            transition-colors duration-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed
            flex space-x-2 justify-center items-center"
          >
            {state.isLoading && <Loader2 className="animate-spin text-lg" />}
            <span>{state.isLoading ? 'Signing Up...' : 'Sign Up'}</span>
          </button>
        </motion.div>
      </form>

      <VerifyPhone
        isOpen={showVerifyPhone}
        phoneNumber={state.formData.mobileNumber}
        countryCode={state.countryCode}
        preventClose={state.isLoading}
        onVerified={() => {
          setShowVerifyPhone(false);
          dispatch({ type: 'SET_IS_LOADING', value: false });
          onClose?.();
        }}
      />
    </motion.div>
  );
};

export default SignupForm;
