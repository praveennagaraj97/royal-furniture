'use client';

import { VerifyCodeInput } from '@/components/shared/inputs/verify-code-input';
import Modal from '@/components/shared/modal';
import { useToast } from '@/contexts/toast-context';
import { useCountdown } from '@/hooks';
import { authService } from '@/services/api/auth-service';
import type { ParsedAPIError } from '@/types/error';
import type { VerifyOTPResponse } from '@/types/response';
import { Loader2 } from 'lucide-react';
import { useCallback, useEffect, useState, type FC } from 'react';

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
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const { showError, showSuccess } = useToast();

  const fullPhoneNumber = `${countryCode} ${phoneNumber}`;

  const {
    secondsLeft,
    isExpired,
    reset: resetCountdown,
  } = useCountdown({
    initialSeconds: 59,
    autoStart: true,
  });

  const parseJwtExp = useCallback((token: string): number | undefined => {
    try {
      const [, payload] = token.split('.');
      const decoded = JSON.parse(
        atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
      );
      return typeof decoded.exp === 'number' ? decoded.exp : undefined;
    } catch {
      return undefined;
    }
  }, []);

  const setTokenCookie = useCallback(
    (name: string, token: string) => {
      const exp = parseJwtExp(token);
      const expires = exp ? new Date(exp * 1000).toUTCString() : undefined;
      const parts = [`${name}=${token}`, 'path=/', 'SameSite=Lax'];
      if (expires) {
        parts.push(`expires=${expires}`);
      }
      document.cookie = parts.join('; ');
    },
    [parseJwtExp]
  );

  const handleVerify = useCallback(
    async (code: string) => {
      // Wait for complete code
      if (code.length !== codeLength) {
        return;
      }

      setIsLoading(true);
      setError(undefined);

      try {
        const response: VerifyOTPResponse = await authService.verifyOTP({
          phone_number: fullPhoneNumber,
          code: code,
        });

        const refreshToken = response.data.tokens.refresh;
        const accessToken = response.data.tokens.access;

        if (refreshToken) {
          setTokenCookie('refresh_token', refreshToken);
        }

        if (accessToken) {
          setTokenCookie('access_token', accessToken);
        }

        showSuccess(
          'You are all set! Phone number verified and you are now logged in.'
        );
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
    [
      codeLength,
      fullPhoneNumber,
      onVerified,
      setTokenCookie,
      showSuccess,
      showError,
    ]
  );

  const handleOtpChange = (value: string) => {
    setOtp(value);
    setError(undefined);
  };

  useEffect(() => {
    if (isOpen) {
      resetCountdown();
    }
  }, [isOpen, resetCountdown]);

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

  const handleResend = async () => {
    if (!isExpired || isResending) {
      return;
    }

    setIsResending(true);
    setError(undefined);

    try {
      await authService.resendVerifyPhone(fullPhoneNumber);
      showSuccess('A new verification code has been sent to your phone.');
      resetCountdown();
    } catch (error) {
      const parsedError = error as ParsedAPIError;
      const errorMessage =
        parsedError.generalError ||
        parsedError.fieldErrors.phone_number ||
        'Failed to resend verification code. Please try again.';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setIsResending(false);
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

          <div className="flex justify-end gap-2 text-sm text-gray-600">
            <button
              type="button"
              onClick={handleResend}
              disabled={!isExpired || isResending}
              className="text-deep-maroon font-medium hover:underline disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed"
            >
              {isResending
                ? 'Resending...'
                : isExpired
                ? 'Resend code'
                : `Resend code in ${secondsLeft}s`}
            </button>
          </div>

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
