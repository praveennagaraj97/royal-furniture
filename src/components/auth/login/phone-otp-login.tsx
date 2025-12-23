'use client';

import { FormInput } from '@/components/shared/inputs/form-input';
import { motion, type Variants } from 'framer-motion';
import {
  useState,
  type ChangeEvent,
  type FC,
  type FormEvent,
} from 'react';

interface PhoneOtpLoginProps {
  onModeChange?: (mode: 'email-password') => void;
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

const PhoneOtpLogin: FC<PhoneOtpLoginProps> = ({ onModeChange }) => {
  const [loginData, setLoginData] = useState({
    phone: '',
    phoneOtp: '',
  });
  const [errors, setErrors] = useState<{
    phone?: string;
    phoneOtp?: string;
  }>({});
  const [touched, setTouched] = useState<{
    phone?: boolean;
    phoneOtp?: boolean;
  }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFieldChange =
    (field: 'phone' | 'phoneOtp') =>
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

  const handleBlur = (field: 'phone' | 'phoneOtp') => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateForm = () => {
    const newErrors: { phone?: string; phoneOtp?: string } = {};

    if (!loginData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]+$/.test(loginData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!loginData.phoneOtp.trim()) {
      newErrors.phoneOtp = 'OTP is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Mark all fields as touched on submit
    setTouched({ phone: true, phoneOtp: true });

    // Validate before submitting
    if (!validateForm()) {
      return;
    }

    // Handle successful login
    console.log('Phone OTP Login data:', loginData);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <motion.div variants={itemVariants}>
          <FormInput
            id="phone"
            type="tel"
            inputMode="numeric"
            placeholder="Phone Number"
            value={loginData.phone}
            onChange={handleFieldChange('phone')}
            onBlur={handleBlur('phone')}
            error={errors.phone}
            showError={!!touched.phone || isSubmitted}
            containerClassName="w-full"
            className="bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormInput
            id="phoneOtp"
            type="text"
            inputMode="numeric"
            placeholder="Enter OTP"
            value={loginData.phoneOtp}
            onChange={handleFieldChange('phoneOtp')}
            onBlur={handleBlur('phoneOtp')}
            error={errors.phoneOtp}
            showError={!!touched.phoneOtp || isSubmitted}
            containerClassName="w-full"
            className="bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <button
            type="submit"
            className="w-full bg-deep-maroon text-white py-3 rounded-lg font-semibold text-base hover:bg-[#6b0000] transition-colors duration-200"
          >
            Verify OTP
          </button>
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
            Back to Email/Password Login
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PhoneOtpLogin;
