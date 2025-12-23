'use client';

import { VerifyCodeInput } from '@/components/shared/inputs/verify-code-input';
import Modal from '@/components/shared/modal';
import { useToast } from '@/contexts/toast-context';
import { authService } from '@/services/api/auth-service';
import type { ParsedAPIError } from '@/types/error';
import { Loader2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type FC } from 'react';

interface VerifyPhoneProps {
  isOpen: boolean;
  phoneNumber: string;
  countryCode: string;
  codeLength?: 5 | 6;
  preventClose?: boolean;
  onVerified?: () => void;
  onClose?: () => void;
}

export const VerifyPhone: FC<VerifyPhoneProps> = ({
  isOpen,
  phoneNumber,
  countryCode,
  codeLength = 5,
  preventClose = false,
  onVerified,
  onClose,
}) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const { showError, showSuccess } = useToast();

  const fullPhoneNumber = `${countryCode} ${phoneNumber}`;

  const handleVerify = useCallback(
    async (code: string) => {
      // Wait for complete code
      if (code.length !== codeLength) {
        return;
      }

      setIsLoading(true);
      setError(undefined);

      try {
        const response = await authService.verifyOTP({
          phone_number: fullPhoneNumber,
          code: code,
        });

        showSuccess(response.message || 'Phone number verified successfully!');
        onVerified?.();
      } catch (error) {
        const parsedError = error as ParsedAPIError;
        const errorMessage =
          parsedError.generalError ||
          parsedError.fieldErrors.code ||
          'Failed to verify OTP. Please try again.';
        setError(errorMessage);
        showError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [codeLength, fullPhoneNumber, onVerified, showSuccess, showError]
  );

  const autoSubmitTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleOtpChange = (value: string) => {
    setOtp(value);
    setError(undefined);

    // Clear any existing timeout
    if (autoSubmitTimeoutRef.current) {
      clearTimeout(autoSubmitTimeoutRef.current);
    }
  };

  // Auto-submit when OTP is complete
  useEffect(() => {
    if (otp.length === codeLength && !isLoading) {
      // Small delay to allow user to see the complete code before auto-submitting
      autoSubmitTimeoutRef.current = setTimeout(() => {
        handleVerify(otp);
      }, 500);

      return () => {
        if (autoSubmitTimeoutRef.current) {
          clearTimeout(autoSubmitTimeoutRef.current);
        }
      };
    }
  }, [otp, codeLength, isLoading, handleVerify]);

  const handleClose = () => {
    if (!preventClose && onClose) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (otp.length === codeLength) {
      handleVerify(otp);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      preventClose={true}
      variant="center"
      size="sm"
      className="max-w-md"
    >
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Verify Phone Number
          </h3>
          <p className="text-sm text-gray-600">
            Enter the code sent to {fullPhoneNumber}
          </p>
        </div>

        <div className="space-y-4">
          <VerifyCodeInput
            maxLength={codeLength}
            inputType="number"
            value={otp}
            onChange={handleOtpChange}
            error={error}
            showError={!!error}
            disabled={isLoading}
            containerClassName="w-full"
          />

          {isLoading && (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying...</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleConfirm}
            disabled={otp.length !== codeLength || isLoading}
            className="w-full bg-deep-maroon text-white py-3 rounded-lg font-semibold text-base hover:bg-[#6b0000] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <span>Verify</span>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};
