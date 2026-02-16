'use client';

import { VerifyCodeInput } from '@/components/shared/inputs/verify-code-input';
import Modal from '@/components/shared/modal';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/contexts/toast-context';
import { useCountdown } from '@/hooks';
import { authService } from '@/services/api/auth-service';
import type { VerifyOTPResponse } from '@/types';
import type { ParsedAPIError } from '@/types/error';
import { getTokenExpiry, setAuthToken, setRefreshToken } from '@/utils';
import { useTranslations } from 'next-intl';
import { useEffect, useState, type FC } from 'react';
import { ImSpinner2 } from 'react-icons/im';

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
  const { checkAuthStatus } = useAuth();
  const t = useTranslations('auth');

  const fullPhoneNumber = `${countryCode} ${phoneNumber}`;

  const {
    secondsLeft,
    isExpired,
    reset: resetCountdown,
  } = useCountdown({
    initialSeconds: 59,
    autoStart: true,
  });

  const handleVerify = async (code: string) => {
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
        const refreshExpiry = getTokenExpiry(refreshToken);
        setRefreshToken(
          refreshToken,
          {
            expires: refreshExpiry ? new Date(refreshExpiry) : undefined,
          },
          false,
        );
      }

      if (accessToken) {
        const accessExpiry = getTokenExpiry(accessToken);
        setAuthToken(
          accessToken,
          {
            expires: accessExpiry ? new Date(accessExpiry) : undefined,
          },
          false,
        );
      }

      // Trigger auth status check to enable session
      checkAuthStatus();

      showSuccess(t('toast.phoneVerified'));
      onVerified?.();
    } catch (error) {
      const parsedError = error as ParsedAPIError;
      const errorMessage =
        parsedError.generalError ||
        parsedError.fieldErrors.code ||
        t('toast.failedToVerifyOtp');
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

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
      showSuccess(t('toast.newOtpSentToPhone'));
      resetCountdown();
    } catch (error) {
      const parsedError = error as ParsedAPIError;
      const errorMessage =
        parsedError.generalError ||
        parsedError.fieldErrors.phone_number ||
        t('toast.failedToResendVerificationCode');
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
          <h3 className="text-lg font-semibold   mb-2">
            {t('forms.verifyPhoneNumber')}
          </h3>
          <p className="text-sm text-gray-600">
            {t('forms.enterCodeSentTo')} {fullPhoneNumber}
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
                ? t('forms.resending')
                : isExpired
                  ? t('forms.resendCode')
                  : `${t('forms.resendCodeIn')} ${secondsLeft}s`}
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
                <ImSpinner2 className="w-5 h-5 animate-spin" />
                <span>{t('forms.verifying')}</span>
              </>
            ) : (
              <span>{t('forms.verify')}</span>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};
