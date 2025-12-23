'use client';

import { FormInput } from '@/components/shared/inputs/form-input';
import { useToast } from '@/contexts/toast-context';
import { authService } from '@/services/api/auth-service';
import type { ParsedAPIError } from '@/types/error';
import { loginFormValidators } from '@/validators';
import { motion, type Variants } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import {
  useEffect,
  useState,
  type ChangeEvent,
  type FC,
  type FormEvent,
} from 'react';
import EmailResetSuccess from './email-reset-success';

interface EmailResetProps {
  onModeChange?: (mode: 'phone-reset') => void;
  onFormStateChange?: (hasValues: boolean) => void;
  onSuccess?: () => void;
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4"
    >
      {!isEmailSent ? (
        <>
          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="text-lg font-semibold text-gray-900 mb-2"
          >
            Reset password using email
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-sm text-gray-600 mb-2"
          >
            Enter your registered email address and we&apos;ll send you a link
            to reset your password.
          </motion.p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <motion.div variants={itemVariants}>
              <FormInput
                id="resetEmail"
                type="email"
                placeholder="Email ID"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                validator={loginFormValidators.email}
                error={errors.email}
                showError={!!touched.email || isSubmitted}
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
                    <span>Sending reset link...</span>
                  </>
                ) : (
                  <span>Send Reset Link</span>
                )}
              </button>
            </motion.div>
          </form>

          {/* Switch to Phone Reset */}
          {onModeChange && (
            <motion.div variants={itemVariants}>
              <button
                type="button"
                onClick={() => onModeChange('phone-reset')}
                className="w-full bg-white border border-gray-300 text-gray-900 py-3 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors duration-200"
              >
                Reset password using phone number
              </button>
            </motion.div>
          )}
        </>
      ) : (
        <EmailResetSuccess email={email} />
      )}
    </motion.div>
  );
};

export default EmailReset;
