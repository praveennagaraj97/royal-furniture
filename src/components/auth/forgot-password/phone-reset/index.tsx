'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { useState, type FC } from 'react';
import NewPassword from './new-password';
import SendVerifyOtp from './send-verify-otp';

interface PhoneResetProps {
  onModeChange?: (mode: 'email-reset') => void;
  onFormStateChange?: (hasValues: boolean) => void;
  onSuccess?: () => void;
  onBackToLogin?: () => void;
}

const PhoneReset: FC<PhoneResetProps> = ({
  onModeChange,
  onFormStateChange,
  onBackToLogin,
}) => {
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [resetToken, setResetToken] = useState('');

  const handleOtpVerified = (
    _verifiedPhoneNumber: string,
    _verifiedCountryCode: string,
    verifiedResetToken: string,
  ) => {
    setResetToken(verifiedResetToken);
    setIsOtpVerified(true);
  };

  const handlePasswordReset = () => {
    onFormStateChange?.(false);
    onBackToLogin?.();
  };

  return (
    <StaggerContainer
      mode="animate"
      staggerChildren={0.1}
      delayChildren={0.1}
      className="flex flex-col gap-4"
    >
      {/* Title */}
      <StaggerItem type="slideUp" distance={20} duration={0.4}>
        <h2 className="text-lg font-semibold   mb-2">
          Reset password using phone
        </h2>
      </StaggerItem>

      {!isOtpVerified ? (
        <SendVerifyOtp
          onOtpVerified={handleOtpVerified}
          onFormStateChange={onFormStateChange}
        />
      ) : (
        <NewPassword
          resetToken={resetToken}
          onFormStateChange={onFormStateChange}
          onPasswordReset={handlePasswordReset}
        />
      )}

      {/* Switch to Email Reset - Only show when not verified */}
      {!isOtpVerified && onModeChange && (
        <StaggerItem type="slideUp" distance={20} duration={0.4}>
          <button
            type="button"
            onClick={() => onModeChange('email-reset')}
            className="w-full bg-white border border-gray-300   py-3 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors duration-200"
          >
            Reset password using email
          </button>
        </StaggerItem>
      )}
    </StaggerContainer>
  );
};

export default PhoneReset;
