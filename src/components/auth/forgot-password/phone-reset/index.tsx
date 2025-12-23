'use client';

import { motion, type Variants } from 'framer-motion';
import { useState, type FC } from 'react';
import NewPassword from './new-password';
import SendVerifyOtp from './send-verify-otp';

interface PhoneResetProps {
  onModeChange?: (mode: 'email-reset') => void;
  onFormStateChange?: (hasValues: boolean) => void;
  onSuccess?: () => void;
  onBackToLogin?: () => void;
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

const PhoneReset: FC<PhoneResetProps> = ({
  onModeChange,
  onFormStateChange,
  onSuccess,
  onBackToLogin,
}) => {
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [otp, setOtp] = useState('');

  const handleOtpVerified = (
    verifiedPhoneNumber: string,
    verifiedCountryCode: string,
    verifiedOtp: string
  ) => {
    setPhoneNumber(verifiedPhoneNumber);
    setCountryCode(verifiedCountryCode);
    setOtp(verifiedOtp);
    setIsOtpVerified(true);
  };

  const handlePasswordReset = () => {
    onFormStateChange?.(false);
    onBackToLogin?.();
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
        Reset password using phone
      </motion.h2>

      {!isOtpVerified ? (
        <SendVerifyOtp
          onOtpVerified={handleOtpVerified}
          onFormStateChange={onFormStateChange}
        />
      ) : (
        <NewPassword
          phoneNumber={phoneNumber}
          countryCode={countryCode}
          otp={otp}
          onFormStateChange={onFormStateChange}
          onPasswordReset={handlePasswordReset}
        />
      )}

      {/* Switch to Email Reset - Only show when not verified */}
      {!isOtpVerified && onModeChange && (
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={() => onModeChange('email-reset')}
            className="w-full bg-white border border-gray-300 text-gray-900 py-3 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors duration-200"
          >
            Reset password using email
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PhoneReset;

