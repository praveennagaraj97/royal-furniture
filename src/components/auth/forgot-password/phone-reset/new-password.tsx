'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { FormInput } from '@/components/shared/inputs/form-input';
import { useToast } from '@/contexts/toast-context';
import { authService } from '@/services/api/auth-service';
import type { ParsedAPIError } from '@/types/error';
import {
  createSignupFormValidators,
  createValidatePassword,
} from '@/validators';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FC,
  type FormEvent,
} from 'react';

interface NewPasswordProps {
  resetToken: string;
  onFormStateChange?: (hasValues: boolean) => void;
  onPasswordReset: () => void;
}

const NewPassword: FC<NewPasswordProps> = ({
  resetToken,
  onFormStateChange,
  onPasswordReset,
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});
  const [touched, setTouched] = useState<{
    password?: boolean;
    confirmPassword?: boolean;
  }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const { showError, showSuccess } = useToast();
  const t = useTranslations('auth');
  const tValidation = useTranslations('auth.validation');

  const signupFormValidators = useMemo(
    () => createSignupFormValidators(tValidation),
    [tValidation]
  );
  const validatePassword = useMemo(
    () => createValidatePassword(tValidation),
    [tValidation]
  );

  // Notify parent when form state changes
  useEffect(() => {
    if (onFormStateChange) {
      const hasValues =
        password.trim().length > 0 || confirmPassword.trim().length > 0;
      onFormStateChange(hasValues);
    }
  }, [password, confirmPassword, onFormStateChange]);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    // Clear error when user starts typing
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }

    // Clear confirm password error if passwords match
    if (errors.confirmPassword && value === confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
    }

    // Mark as touched if form was submitted
    if (isSubmitted) {
      setTouched((prev) => ({ ...prev, password: true }));
    }
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);

    // Clear error when user starts typing
    if (errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
    }

    // Mark as touched if form was submitted
    if (isSubmitted) {
      setTouched((prev) => ({ ...prev, confirmPassword: true }));
    }
  };

  const handlePasswordBlur = (field: 'password' | 'confirmPassword') => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validatePasswordFields = (): boolean => {
    const newErrors: {
      password?: string;
      confirmPassword?: string;
    } = {};

    const passwordError = validatePassword(password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    const confirmPasswordError = signupFormValidators.confirmPassword(
      confirmPassword,
      password
    );
    if (confirmPasswordError) {
      newErrors.confirmPassword = confirmPasswordError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTouched({ password: true, confirmPassword: true });

    if (!validatePasswordFields()) {
      return;
    }

    setIsResetting(true);

    try {
      await authService.forgotPasswordResetPasswordSMS({
        reset_token: resetToken,
        new_password: password,
        confirm_password: confirmPassword,
      });

      showSuccess(t('toast.passwordResetSuccess'));
      onFormStateChange?.(false);
      onPasswordReset();
    } catch (error) {
      const parsedError = error as ParsedAPIError;

      if (parsedError.generalError) {
        showError(parsedError.generalError);
      }

      const fieldErrors = { ...errors };
      if (parsedError.fieldErrors.new_password) {
        fieldErrors.password = parsedError.fieldErrors.new_password;
      } else if (parsedError.fieldErrors.password) {
        fieldErrors.password = parsedError.fieldErrors.password;
      } else if (parsedError.generalError) {
        fieldErrors.password = parsedError.generalError;
      }

      if (parsedError.fieldErrors.confirm_password) {
        fieldErrors.confirmPassword = parsedError.fieldErrors.confirm_password;
      } else if (parsedError.fieldErrors.confirmPassword) {
        fieldErrors.confirmPassword = parsedError.fieldErrors.confirmPassword;
      }

      setErrors(fieldErrors);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <StaggerContainer
      mode="animate"
      staggerChildren={0.1}
      delayChildren={0.1}
      className="flex flex-col gap-4"
    >
      <StaggerItem type="slideUp" distance={20} duration={0.4}>
        <p className="text-sm text-gray-600 mb-2">
          {t('forms.enterNewPassword')}
        </p>
      </StaggerItem>

      <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
        <StaggerItem type="slideUp" distance={20} duration={0.4}>
          <FormInput
            id="newPassword"
            type="password"
            placeholder={t('forms.newPassword')}
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur('password')}
            validator={validatePassword}
            error={errors.password}
            showError={!!touched.password || isSubmitted}
            containerClassName="w-full"
            className="bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400"
          />
        </StaggerItem>

        <StaggerItem type="slideUp" distance={20} duration={0.4}>
          <FormInput
            id="confirmNewPassword"
            type="password"
            placeholder={t('forms.confirmNewPassword')}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onBlur={handlePasswordBlur('confirmPassword')}
            validator={(value) =>
              signupFormValidators.confirmPassword(value, password)
            }
            error={errors.confirmPassword}
            showError={!!touched.confirmPassword || isSubmitted}
            containerClassName="w-full"
            className="bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400"
          />
        </StaggerItem>

        <StaggerItem type="slideUp" distance={20} duration={0.4}>
          <button
            type="submit"
            disabled={isResetting}
            className="w-full bg-deep-maroon text-white py-3 rounded-lg font-semibold text-base hover:bg-[#6b0000] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isResetting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{t('forms.resettingPassword')}</span>
              </>
            ) : (
              <span>{t('forms.resetPassword')}</span>
            )}
          </button>
        </StaggerItem>
      </form>
    </StaggerContainer>
  );
};

export default NewPassword;
