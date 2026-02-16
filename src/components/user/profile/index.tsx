'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { CountryPicker } from '@/components/shared/inputs/country-picker';
import { FormInput } from '@/components/shared/inputs/form-input';
import { useToast } from '@/contexts/toast-context';
import { useUser } from '@/contexts/user-context';
import { authService } from '@/services/api/auth-service';
import type { ParsedAPIError } from '@/types/error';
import { createSignupFormValidators } from '@/validators';
import { useTranslations } from 'next-intl';
import {
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FC,
  type FormEvent,
} from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';

// Parse phone number to extract country code and number
const parsePhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber) return { countryCode: '+971', number: '' };

  // Try to extract country code (common formats: +971 50 123 4567 or +971501234567)
  const match = phoneNumber.match(/^(\+\d{1,4})\s*(.+)$/);
  if (match) {
    return { countryCode: match[1], number: match[2].replace(/\s/g, '') };
  }

  // Default to UAE if no match
  return { countryCode: '+971', number: phoneNumber.replace(/\s/g, '') };
};

const ProfilePage: FC = () => {
  const { user, refreshUser } = useUser();
  const { showSuccess, showError } = useToast();
  const t = useTranslations('user.profile');
  const tValidation = useTranslations('auth.validation');
  const [isLoading, setIsLoading] = useState(false);

  // Compute initial form data from user
  const initialFormData = useMemo(() => {
    if (!user) {
      return {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        countryCode: '+971',
      };
    }

    const firstName = user.first_name || '';
    const lastName = user.last_name || '';
    const { countryCode, number } = parsePhoneNumber(user.phone_number || '');

    return {
      firstName,
      lastName,
      email: user.email || '',
      phoneNumber: number,
      countryCode,
    };
  }, [user]);

  const [formData, setFormData] = useState(initialFormData);
  const initializedRef = useRef(false);

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
  }>({});

  const [touched, setTouched] = useState<{
    firstName?: boolean;
    lastName?: boolean;
    email?: boolean;
    phoneNumber?: boolean;
  }>({});

  const [isSubmitted, setIsSubmitted] = useState(false);

  const validators = useMemo(
    () => createSignupFormValidators(tValidation),
    [tValidation],
  );

  // Update form data when user data loads (only once)
  useEffect(() => {
    if (user && !initializedRef.current) {
      initializedRef.current = true;
      startTransition(() => {
        setFormData(initialFormData);
      });
    }
  }, [user, initialFormData]);

  const handleFieldChange =
    (field: 'firstName' | 'lastName' | 'email' | 'phoneNumber') =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleBlur =
    (field: 'firstName' | 'lastName' | 'email' | 'phoneNumber') => () => {
      setTouched((prev) => ({ ...prev, [field]: true }));
    };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    const firstNameError = validators.firstName(formData.firstName);
    const lastNameError = validators.lastName(formData.lastName);
    const emailError = validators.email(formData.email);
    const phoneNumberError = validators.mobileNumber(
      formData.phoneNumber,
      formData.countryCode,
    );

    if (firstNameError) newErrors.firstName = firstNameError;
    if (lastNameError) newErrors.lastName = lastNameError;
    if (emailError) newErrors.email = emailError;
    if (phoneNumberError) newErrors.phoneNumber = phoneNumberError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
    });

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const fullPhoneNumber = `${formData.countryCode} ${formData.phoneNumber}`;

      await authService.updateProfile({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_number: fullPhoneNumber,
      });

      // Refresh user data to get updated profile
      await refreshUser();

      showSuccess(t('updateSuccess'));
    } catch (error) {
      const parsedError = error as ParsedAPIError;
      const errorMessage =
        parsedError.generalError ||
        'Failed to update profile. Please try again.';
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StaggerContainer
      staggerChildren={0.1}
      delayChildren={0.1}
      className="space-y-6"
    >
      <StaggerItem
        type="slideUp"
        distance={20}
        duration={0.4}
        className="text-2xl font-semibold   mb-6"
      >
        <h1>{t('title')}</h1>
      </StaggerItem>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <StaggerItem type="slideUp" distance={20} duration={0.4}>
              <FormInput
                id="firstName"
                type="text"
                label={t('firstName')}
                value={formData.firstName}
                onChange={handleFieldChange('firstName')}
                onBlur={handleBlur('firstName')}
                validator={validators.firstName}
                error={errors.firstName}
                showError={!!touched.firstName || isSubmitted}
                containerClassName="w-full"
              />
            </StaggerItem>

            <StaggerItem type="slideUp" distance={20} duration={0.4}>
              <div className="w-full">
                <label className="form-input-label mb-2 block">
                  {t('phoneNumber')}
                </label>
                <div className="flex items-start gap-2">
                  <div className="shrink-0">
                    <CountryPicker
                      className="py-3"
                      value={formData.countryCode}
                      onChange={(dialCode) =>
                        setFormData((prev) => ({
                          ...prev,
                          countryCode: dialCode,
                        }))
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <FormInput
                      id="phoneNumber"
                      type="tel"
                      inputMode="numeric"
                      value={formData.phoneNumber}
                      onChange={handleFieldChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      validator={(value) =>
                        validators.mobileNumber(value, formData.countryCode)
                      }
                      error={errors.phoneNumber}
                      showError={!!touched.phoneNumber || isSubmitted}
                      containerClassName="w-full"
                      rightElement={
                        <button
                          type="button"
                          className="text-deep-maroon bg-deep-maroon/10 p-1.5 rounded-full 
                          hover:text-deep-maroon/80 hover:scale-110 hover:bg-deep-maroon/20 transition-all duration-200"
                          title={t('change')}
                        >
                          <FiEdit2 className="h-4 w-4" />
                        </button>
                      }
                    />
                  </div>
                </div>
              </div>
            </StaggerItem>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <StaggerItem type="slideUp" distance={20} duration={0.4}>
              <FormInput
                id="lastName"
                type="text"
                label={t('lastName')}
                value={formData.lastName}
                onChange={handleFieldChange('lastName')}
                onBlur={handleBlur('lastName')}
                validator={validators.lastName}
                error={errors.lastName}
                showError={!!touched.lastName || isSubmitted}
                containerClassName="w-full"
              />
            </StaggerItem>

            <StaggerItem type="slideUp" distance={20} duration={0.4}>
              <FormInput
                id="email"
                type="email"
                label={t('email')}
                value={formData.email}
                onChange={handleFieldChange('email')}
                onBlur={handleBlur('email')}
                validator={validators.email}
                error={errors.email}
                showError={!!touched.email || isSubmitted}
                containerClassName="w-full"
              />
            </StaggerItem>
          </div>
        </div>

        <StaggerItem type="slideUp" distance={20} duration={0.4}>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto bg-deep-maroon text-white py-3 px-8 rounded-md font-semibold text-base hover:bg-deep-maroon/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading && <ImSpinner2 className="animate-spin h-5 w-5" />}
            <span>{isLoading ? t('updating') : t('update')}</span>
          </button>
        </StaggerItem>
      </form>
    </StaggerContainer>
  );
};

export default ProfilePage;
