'use client';

import { CountryPicker } from '@/components/shared/inputs/country-picker';
import { FormInput } from '@/components/shared/inputs/form-input';
import { VerifyCodeInput } from '@/components/shared/inputs/verify-code-input';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/contexts/toast-context';
import { useCountdown } from '@/hooks';
import { authService } from '@/services/api/auth-service';
import type { ParsedAPIError } from '@/types/error';
import type { VerifyOTPResponse } from '@/types/response';
import { getTokenExpiry, setAuthToken, setRefreshToken } from '@/utils';
import { createSignupFormValidators } from '@/validators';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { Loader2 } from 'lucide-react';
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

interface PhoneOtpLoginProps {
  onModeChange?: (mode: 'email-password') => void;
  onFormStateChange?: (hasValues: boolean) => void;
  onLoginSuccess?: () => void;
}

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

const otpInputVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

const PhoneOtpLogin: FC<PhoneOtpLoginProps> = ({
  onModeChange,
  onFormStateChange,
  onLoginSuccess,
}) => {
  const [countryCode, setCountryCode] = useState('+971');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errors, setErrors] = useState<{
    phone?: string;
    otp?: string;
  }>({});
  const [touched, setTouched] = useState<{
    phone?: boolean;
    otp?: boolean;
  }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { showError, showSuccess } = useToast();
  const { checkAuthStatus } = useAuth();
  const prevPhoneRef = useRef<string>('');
  const prevCountryCodeRef = useRef<string>('+971');
  const t = useTranslations('auth');
  const tValidation = useTranslations('auth.validation');
  
  const signupFormValidators = useMemo(
    () => createSignupFormValidators(tValidation),
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
      const hasValues = phoneNumber.trim().length > 0 || otp.trim().length > 0;
      onFormStateChange(hasValues);
    }
  }, [phoneNumber, otp, onFormStateChange]);

  // Reset OTP state when phone number or country code changes
  useEffect(() => {
    if (
      isOtpSent &&
      prevPhoneRef.current !== '' &&
      (prevPhoneRef.current !== phoneNumber ||
        prevCountryCodeRef.current !== countryCode)
    ) {
      // Phone number or country code changed, reset OTP state
      setIsOtpSent(false);
      setOtp('');
      setErrors((prev) => ({ ...prev, otp: undefined }));
      resetCountdown();
    }
    prevPhoneRef.current = phoneNumber;
    prevCountryCodeRef.current = countryCode;
  }, [phoneNumber, countryCode, isOtpSent, resetCountdown]);

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);

    // Clear error when user starts typing
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }

    // Mark as touched if form was submitted
    if (isSubmitted) {
      setTouched((prev) => ({ ...prev, phone: true }));
    }
  };

  const handlePhoneBlur = () => {
    setTouched((prev) => ({ ...prev, phone: true }));
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (errors.otp) {
      setErrors((prev) => ({ ...prev, otp: undefined }));
    }
  };

  const formatPhoneNumber = (): string => {
    // Remove any spaces from phone number and combine with country code (with space)
    const cleanPhone = phoneNumber.replace(/\s+/g, '');
    return `${countryCode} ${cleanPhone}`;
  };

  const validatePhone = (): boolean => {
    const phoneError = signupFormValidators.mobileNumber(
      phoneNumber,
      countryCode
    );
    if (phoneError) {
      setErrors((prev) => ({ ...prev, phone: phoneError }));
      return false;
    }
    return true;
  };

  const handleSendOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTouched((prev) => ({ ...prev, phone: true }));

    if (!validatePhone()) {
      return;
    }

    setIsSendingOtp(true);

    try {
      const formattedPhone = formatPhoneNumber();
      await authService.phoneLogin({ phone_number: formattedPhone });
      setIsOtpSent(true);
      resetCountdown();
      showSuccess(t('toast.otpSentToPhone'));
    } catch (error) {
      const parsedError = error as ParsedAPIError;
      const errorMessage =
        parsedError.generalError ||
        parsedError.fieldErrors.phone_number ||
        t('toast.failedToSendOtp');
      setErrors((prev) => ({ ...prev, phone: errorMessage }));
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
      const formattedPhone = formatPhoneNumber();
      const response: VerifyOTPResponse = await authService.verifyOTPLogin({
        phone_number: formattedPhone,
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
      const formattedPhone = formatPhoneNumber();
      await authService.resendOTP({ phone_number: formattedPhone });
      showSuccess(t('toast.newOtpSentToPhone'));
      resetCountdown();
      setOtp('');
    } catch (error) {
      const parsedError = error as ParsedAPIError;
      const errorMessage =
        parsedError.generalError ||
        parsedError.fieldErrors.phone_number ||
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4"
    >
      <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
        <motion.div variants={itemVariants}>
          <div className="w-full">
            <div className="flex items-start gap-2">
              <div className="shrink-0">
                <CountryPicker
                  className="py-3"
                  value={countryCode}
                  onChange={setCountryCode}
                />
              </div>
              <div className="flex-1">
                <FormInput
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder={t('forms.mobileNumber')}
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  onBlur={handlePhoneBlur}
                  validator={(value) =>
                    signupFormValidators.mobileNumber(value, countryCode)
                  }
                  error={errors.phone}
                  showError={!!touched.phone || isSubmitted}
                  containerClassName="w-full"
                  className="bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400"
                  disabled={isOtpSent}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {isOtpSent && (
            <motion.div
              variants={otpInputVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col gap-4"
            >
              <motion.div variants={itemVariants}>
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
              </motion.div>

              <motion.div variants={itemVariants} className="flex justify-end">
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div variants={itemVariants}>
          {!isOtpSent ? (
            <button
              type="submit"
              disabled={isSendingOtp}
              className="w-full bg-deep-maroon text-white py-3 rounded-lg font-semibold text-base hover:bg-[#6b0000] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSendingOtp ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
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
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{t('forms.verifying')}</span>
                </>
              ) : (
                <span>{t('forms.verifyOtp')}</span>
              )}
            </button>
          )}
        </motion.div>
      </form>

      {/* Back to Email/Password Button */}
      {onModeChange && (
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={() => onModeChange('email-password')}
            className="w-full bg-white border border-gray-300 text-gray-900 py-3 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors duration-200"
          >
            {t('forms.backToEmailPasswordLogin')}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PhoneOtpLogin;
