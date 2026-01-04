'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { FormInput } from '@/components/shared/inputs/form-input';
import { useToast } from '@/contexts/toast-context';
import { authService } from '@/services/api/auth-service';
import type { ParsedAPIError } from '@/types/error';
import { createLoginFormValidators } from '@/validators';
import { useTranslations } from 'next-intl';
import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FC,
  type FormEvent,
} from 'react';
import { ImSpinner2 } from 'react-icons/im';
import EmailResetSuccess from './email-reset-success';

interface EmailResetProps {
  onModeChange?: (mode: 'phone-reset') => void;
  onFormStateChange?: (hasValues: boolean) => void;
  onSuccess?: () => void;
}

const EmailReset: FC<EmailResetProps> = ({
  onModeChange,
  onFormStateChange,
}) => {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
  }>({});
  const [touched, setTouched] = useState<{
    email?: boolean;
  }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showError } = useToast();
  const t = useTranslations('auth');
  const tValidation = useTranslations('auth.validation');

  const loginFormValidators = useMemo(
    () => createLoginFormValidators(tValidation),
    [tValidation]
  );

  // Notify parent when form state changes
  useEffect(() => {
    if (onFormStateChange) {
      // Don't track form state if email is already sent
      const hasValues = !isEmailSent && email.trim().length > 0;
      onFormStateChange(hasValues);
    }
  }, [email, isEmailSent, onFormStateChange]);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Clear error when user starts typing
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }

    // Mark as touched if form was submitted
    if (isSubmitted) {
      setTouched((prev) => ({ ...prev, email: true }));
    }
  };

  const handleEmailBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }));
  };

  const validateEmail = (): boolean => {
    const emailError = loginFormValidators.email(email);
    if (emailError) {
      setErrors((prev) => ({ ...prev, email: emailError }));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTouched((prev) => ({ ...prev, email: true }));

    if (!validateEmail()) {
      return;
    }

    setIsLoading(true);

    try {
      await authService.forgotPasswordEmail({ email });

      setIsEmailSent(true);
      onFormStateChange?.(false);
    } catch (error) {
      const parsedError = error as ParsedAPIError;

      if (parsedError.generalError) {
        showError(parsedError.generalError);
      }

      const fieldErrors = { ...errors };
      if (parsedError.fieldErrors.email) {
        fieldErrors.email = parsedError.fieldErrors.email;
      } else if (parsedError.generalError) {
        fieldErrors.email = parsedError.generalError;
      }

      setErrors(fieldErrors);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StaggerContainer
      mode="animate"
      staggerChildren={0.1}
      delayChildren={0.1}
      className="flex flex-col gap-4"
    >
      {!isEmailSent ? (
        <>
          {/* Title */}
          <StaggerItem type="slideUp" distance={20} duration={0.4}>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {t('forms.resetPasswordUsingEmail')}
            </h2>
          </StaggerItem>

          <StaggerItem type="slideUp" distance={20} duration={0.4}>
            <p className="text-sm text-gray-600 mb-2">
              {t('forms.enterRegisteredEmail')}
            </p>
          </StaggerItem>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <StaggerItem type="slideUp" distance={20} duration={0.4}>
              <FormInput
                id="resetEmail"
                type="email"
                placeholder={t('forms.email')}
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                validator={loginFormValidators.email}
                error={errors.email}
                showError={!!touched.email || isSubmitted}
                containerClassName="w-full"
                className="bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400"
              />
            </StaggerItem>

            <StaggerItem type="slideUp" distance={20} duration={0.4}>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-deep-maroon text-white py-3 rounded-lg font-semibold text-base hover:bg-[#6b0000] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <ImSpinner2 className="w-5 h-5 animate-spin" />
                    <span>{t('forms.sendingResetLink')}</span>
                  </>
                ) : (
                  <span>{t('forms.sendResetLink')}</span>
                )}
              </button>
            </StaggerItem>
          </form>

          {/* Switch to Phone Reset */}
          {onModeChange && (
            <StaggerItem type="slideUp" distance={20} duration={0.4}>
              <button
                type="button"
                onClick={() => onModeChange('phone-reset')}
                className="w-full bg-white border border-gray-300 text-gray-900 py-3 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors duration-200"
              >
                {t('forms.resetPasswordUsingPhone')}
              </button>
            </StaggerItem>
          )}
        </>
      ) : (
        <EmailResetSuccess email={email} />
      )}
    </StaggerContainer>
  );
};

export default EmailReset;
