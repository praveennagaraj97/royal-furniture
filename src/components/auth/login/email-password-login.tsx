'use client';

import { FormInput } from '@/components/shared/inputs/form-input';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/contexts/toast-context';
import { authService } from '@/services/api/auth-service';
import type { ParsedAPIError } from '@/types/error';
import { getTokenExpiry, setAuthToken, setRefreshToken } from '@/utils';
import { createLoginFormValidators } from '@/validators';
import { motion, type Variants } from 'framer-motion';
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

interface EmailPasswordLoginProps {
  onModeChange?: (mode: 'phone-otp' | 'email-otp') => void;
  onFormStateChange?: (hasValues: boolean) => void;
  onLoginSuccess?: () => void;
  onForgotPassword?: () => void;
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

const EmailPasswordLogin: FC<EmailPasswordLoginProps> = ({
  onModeChange,
  onFormStateChange,
  onLoginSuccess,
  onForgotPassword,
}) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [touched, setTouched] = useState<{
    email?: boolean;
    password?: boolean;
  }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showError, showSuccess } = useToast();
  const { checkAuthStatus } = useAuth();
  const t = useTranslations('auth');
  const tValidation = useTranslations('auth.validation');
  
  const loginFormValidators = useMemo(
    () => createLoginFormValidators(tValidation),
    [tValidation]
  );

  const handleFieldChange =
    (field: 'email' | 'password') => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLoginData((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }

      // Mark as touched if form was submitted
      if (isSubmitted) {
        setTouched((prev) => ({ ...prev, [field]: true }));
      }
    };

  const handleBlur = (field: 'email' | 'password') => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    const emailError = loginFormValidators.email(loginData.email);
    const passwordError = loginFormValidators.password(loginData.password);

    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (!onFormStateChange) return;
    const hasValues =
      loginData.email.trim().length > 0 || loginData.password.trim().length > 0;
    onFormStateChange(hasValues);
  }, [loginData.email, loginData.password, onFormStateChange]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Mark all fields as touched on submit
    setTouched({ email: true, password: true });

    // Validate before submitting
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.loginWithPassword({
        email: loginData.email,
        password: loginData.password,
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

      showSuccess(t('toast.loginSuccess'));
      onFormStateChange?.(false);
      onLoginSuccess?.();
    } catch (error) {
      const parsedError = error as ParsedAPIError;

      if (parsedError.generalError) {
        showError(parsedError.generalError);
      }

      const fieldErrors = { ...errors };
      if (parsedError.fieldErrors.email) {
        fieldErrors.email = parsedError.fieldErrors.email;
      }
      if (parsedError.fieldErrors.password) {
        fieldErrors.password = parsedError.fieldErrors.password;
      }

      setErrors(fieldErrors);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4"
    >
      {/* Title */}
      <motion.h2
        variants={itemVariants}
        className="text-lg font-semibold text-gray-900 mb-2"
      >
        {t('forms.loginWithRegisteredEmail')}
      </motion.h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <motion.div variants={itemVariants}>
          <FormInput
            id="loginEmail"
            type="email"
            placeholder={t('forms.email')}
            value={loginData.email}
            onChange={handleFieldChange('email')}
            onBlur={handleBlur('email')}
            validator={loginFormValidators.email}
            error={errors.email}
            showError={!!touched.email || isSubmitted}
            containerClassName="w-full"
            className="bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormInput
            id="loginPassword"
            type="password"
            placeholder={t('forms.password')}
            value={loginData.password}
            onChange={handleFieldChange('password')}
            onBlur={handleBlur('password')}
            validator={loginFormValidators.password}
            error={errors.password}
            showError={!!touched.password || isSubmitted}
            containerClassName="w-full"
            className="bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-deep-maroon text-white py-3 rounded-lg font-semibold text-base hover:bg-[#6b0000] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{t('forms.loggingIn')}</span>
              </>
            ) : (
              <span>{t('forms.login')}</span>
            )}
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-indigo-slate hover:text-indigo-800 font-semibold transition-colors duration-200"
          >
            {t('forms.forgotPassword')}
          </button>
        </motion.div>
      </form>

      {/* OTP Login Buttons */}
      {onModeChange && (
        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => onModeChange('phone-otp')}
            className="w-full bg-white border border-gray-300 text-gray-900 py-3 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors duration-200"
          >
            {t('forms.loginWithPhoneOtp')}
          </button>

          <button
            type="button"
            onClick={() => onModeChange('email-otp')}
            className="w-full bg-white border border-gray-300 text-gray-900 py-3 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors duration-200"
          >
            {t('forms.loginWithEmailOtp')}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmailPasswordLogin;
