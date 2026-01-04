'use client';

import {
  AnimatePresenceWrapper,
  StaggerContainer,
  StaggerItem,
} from '@/components/shared/animations';
import { FormInput } from '@/components/shared/inputs/form-input';
import { VerifyCodeInput } from '@/components/shared/inputs/verify-code-input';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/contexts/toast-context';
import { useCountdown } from '@/hooks';
import { authService } from '@/services/api/auth-service';
import type { ParsedAPIError } from '@/types/error';
import type { VerifyOTPResponse } from '@/types/response';
import { getTokenExpiry, setAuthToken, setRefreshToken } from '@/utils';
import { createLoginFormValidators } from '@/validators';
import { useTranslations } from 'next-intl';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FC,
  type FormEvent,
} from 'react';
import { FiLoader } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';

interface EmailOtpLoginProps {
  onModeChange?: (mode: 'email-password') => void;
  onFormStateChange?: (hasValues: boolean) => void;
  onLoginSuccess?: () => void;
}

const EmailOtpLogin: FC<EmailOtpLoginProps> = ({
  onModeChange,
  onFormStateChange,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    otp?: string;
  }>({});
  const [touched, setTouched] = useState<{
    email?: boolean;
    otp?: boolean;
  }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { showError, showSuccess } = useToast();
  const { checkAuthStatus } = useAuth();
  const prevEmailRef = useRef<string>('');
  const t = useTranslations('auth');
  const tValidation = useTranslations('auth.validation');

  const loginFormValidators = useMemo(
    () => createLoginFormValidators(tValidation),
    [tValidation]
  );

  const {
    secondsLeft,
    isExpired,
    reset: resetCountdown,
  } = useCountdown({
    initialSeconds: 59,
    autoStart: false,
  });

  // Notify parent when form state changes
  useEffect(() => {
    if (onFormStateChange) {
      const hasValues = email.trim().length > 0 || otp.trim().length > 0;
      onFormStateChange(hasValues);
    }
  }, [email, otp, onFormStateChange]);

  // Reset OTP state when email changes
  useEffect(() => {
    if (
      isOtpSent &&
      prevEmailRef.current !== '' &&
      prevEmailRef.current !== email
    ) {
      // Email actually changed, reset OTP state
      setIsOtpSent(false);
      setOtp('');
      setErrors((prev) => ({ ...prev, otp: undefined }));
      resetCountdown();
    }
    prevEmailRef.current = email;
  }, [email, isOtpSent, resetCountdown]);

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

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (errors.otp) {
      setErrors((prev) => ({ ...prev, otp: undefined }));
    }
  };

  const validateEmail = (): boolean => {
    const emailError = loginFormValidators.email(email);
    if (emailError) {
      setErrors((prev) => ({ ...prev, email: emailError }));
      return false;
    }
    return true;
  };

  const handleSendOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTouched((prev) => ({ ...prev, email: true }));

    if (!validateEmail()) {
      return;
    }

    setIsSendingOtp(true);

    try {
      await authService.emailLogin({ email });
      setIsOtpSent(true);
      resetCountdown();
      showSuccess(t('toast.otpSentToEmail'));
    } catch (error) {
      const parsedError = error as ParsedAPIError;
      const errorMessage =
        parsedError.generalError ||
        parsedError.fieldErrors.email ||
        t('toast.failedToSendOtp');
      setErrors((prev) => ({ ...prev, email: errorMessage }));
      showError(errorMessage);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 5) {
      setErrors((prev) => ({ ...prev, otp: tValidation('otpInvalid') }));
      return;
    }

    setIsVerifying(true);
    setErrors((prev) => ({ ...prev, otp: undefined }));

    try {
      const response: VerifyOTPResponse = await authService.verifyOTPLogin({
        email,
        otp,
      });

      const refreshToken = response.data.tokens.refresh;
      const accessToken = response.data.tokens.access;

      if (refreshToken) {
        const refreshExpiry = getTokenExpiry(refreshToken);
        setRefreshToken(
          refreshToken,
          {
            expires: refreshExpiry ? new Date(refreshExpiry) : undefined,
          },
          false
        );
      }

      if (accessToken) {
        const accessExpiry = getTokenExpiry(accessToken);
        setAuthToken(
          accessToken,
          {
            expires: accessExpiry ? new Date(accessExpiry) : undefined,
          },
          false
        );
      }

      // Trigger auth status check to enable session
      checkAuthStatus();

      showSuccess(t('toast.loginSuccessful'));
      onFormStateChange?.(false);
      onLoginSuccess?.();
    } catch (error) {
      const parsedError = error as ParsedAPIError;
      const errorMessage =
        parsedError.generalError ||
        parsedError.fieldErrors.otp ||
        t('toast.failedToVerifyOtp');
      setErrors((prev) => ({ ...prev, otp: errorMessage }));
      showError(errorMessage);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (!isExpired || isResending) {
      return;
    }

    setIsResending(true);
    setErrors((prev) => ({ ...prev, otp: undefined }));

    try {
      await authService.resendOTP({ email });
      showSuccess(t('toast.newOtpSentToEmail'));
      resetCountdown();
      setOtp('');
    } catch (error) {
      const parsedError = error as ParsedAPIError;
      const errorMessage =
        parsedError.generalError ||
        parsedError.fieldErrors.email ||
        t('toast.failedToResendOtp');
      showError(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  const handleOtpComplete = (value: string) => {
    if (value.length === 5) {
      handleVerifyOtp();
    }
  };

  return (
    <StaggerContainer
      mode="animate"
      staggerChildren={0.1}
      delayChildren={0.1}
      className="flex flex-col gap-4"
    >
      <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
        <StaggerItem type="slideUp" distance={20} duration={0.4}>
          <FormInput
            id="emailOtpEmail"
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
            disabled={isOtpSent}
          />
        </StaggerItem>

        <AnimatePresenceWrapper
          show={isOtpSent}
          exitAnimation={{ opacity: 0, y: 20, scale: 0.95 }}
          enterAnimation={{ opacity: 1, y: 0, scale: 1 }}
          duration={0.3}
        >
          <div className="flex flex-col gap-4">
            <StaggerItem type="slideUp" distance={20} duration={0.4}>
              <VerifyCodeInput
                maxLength={5}
                inputType="number"
                value={otp}
                onChange={handleOtpChange}
                onComplete={handleOtpComplete}
                error={errors.otp}
                showError={!!errors.otp}
                disabled={isVerifying}
                containerClassName="w-full"
              />
            </StaggerItem>

            <StaggerItem
              type="slideUp"
              distance={20}
              duration={0.4}
              className="flex justify-end"
            >
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={!isExpired || isResending}
                className="text-sm text-deep-maroon font-medium hover:underline disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed"
              >
                {isResending
                  ? t('forms.resending')
                  : isExpired
                  ? t('forms.resendCode')
                  : `${t('forms.resendCodeIn')} ${secondsLeft}s`}
              </button>
            </StaggerItem>
          </div>
        </AnimatePresenceWrapper>

        <StaggerItem type="slideUp" distance={20} duration={0.4}>
          {!isOtpSent ? (
            <button
              type="submit"
              disabled={isSendingOtp}
              className="w-full bg-deep-maroon text-white py-3 rounded-lg font-semibold text-base hover:bg-[#6b0000] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSendingOtp ? (
                <>
                  <ImSpinner2 className="w-5 h-5 animate-spin" />
                  <span>{t('forms.sendingOtp')}</span>
                </>
              ) : (
                <span>{t('forms.sendOtp')}</span>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={otp.length !== 5 || isVerifying}
              className="w-full bg-deep-maroon text-white py-3 rounded-lg font-semibold text-base hover:bg-[#6b0000] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <>
                  <FiLoader className="w-5 h-5 animate-spin" />
                  <span>{t('forms.verifying')}</span>
                </>
              ) : (
                <span>{t('forms.verifyOtp')}</span>
              )}
            </button>
          )}
        </StaggerItem>
      </form>

      {/* Back to Email/Password Button */}
      {onModeChange && (
        <StaggerItem type="slideUp" distance={20} duration={0.4}>
          <button
            type="button"
            onClick={() => onModeChange('email-password')}
            className="w-full bg-white border border-gray-300 text-gray-900 py-3 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors duration-200"
          >
            {t('forms.backToEmailPasswordLogin')}
          </button>
        </StaggerItem>
      )}
    </StaggerContainer>
  );
};

export default EmailOtpLogin;
