'use client';

import { FormInput } from '@/components/shared/inputs/form-input';
import { loginFormValidators } from '@/validators';
import { motion, type Variants } from 'framer-motion';
import {
  useState,
  type ChangeEvent,
  type FC,
  type FormEvent,
} from 'react';

interface EmailPasswordLoginProps {
  onModeChange?: (mode: 'phone-otp' | 'email-otp') => void;
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

const EmailPasswordLogin: FC<EmailPasswordLoginProps> = ({ onModeChange }) => {
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

  const handleFieldChange =
    (field: 'email' | 'password') =>
    (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Mark all fields as touched on submit
    setTouched({ email: true, password: true });

    // Validate before submitting
    if (!validateForm()) {
      return;
    }

    // Handle successful login
    console.log('Email/Password Login data:', loginData);
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
        Login with your registered email
      </motion.h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <motion.div variants={itemVariants}>
          <FormInput
            id="loginEmail"
            type="email"
            placeholder="Email iD"
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
            placeholder="Password"
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
            className="w-full bg-deep-maroon text-white py-3 rounded-lg font-semibold text-base hover:bg-[#6b0000] transition-colors duration-200"
          >
            Login
          </button>
        </motion.div>

        <motion.div variants={itemVariants}>
          <button
            type="button"
            className="text-sm text-indigo-600 hover:text-indigo-700 transition-colors duration-200 w-full text-left"
          >
            Forgot Password?
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
            Login with phone number OTP
          </button>

          <button
            type="button"
            onClick={() => onModeChange('email-otp')}
            className="w-full bg-white border border-gray-300 text-gray-900 py-3 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors duration-200"
          >
            Login with email OTP
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmailPasswordLogin;
