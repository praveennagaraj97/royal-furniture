import { CountryPicker } from '@/components/shared/inputs/country-picker';
import { FormInput } from '@/components/shared/inputs/form-input';
import { VerifyCodeInput } from '@/components/shared/inputs/verify-code-input';
import { useToast } from '@/contexts/toast-context';
import { useCountdown } from '@/hooks';
import { userService } from '@/services/api/user-service';
import type { ParsedAPIError } from '@/types/error';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';

interface PhoneFieldProps {
  label: string;
  placeholder: string;
  required?: boolean;
  value: string;
  countryCode: string;
  error?: string;
  showError: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onCountryCodeChange: (code: string) => void;
  validator: (value: string) => string | undefined;
  isGuest?: boolean;
  initiallyVerified?: boolean;
  onVerificationStatusChange?: (verified: boolean) => void;
}

export function PhoneField({
  label,
  placeholder,
  required = false,
  value,
  countryCode,
  error,
  showError,
  onChange,
  onBlur,
  onCountryCodeChange,
  validator,
  isGuest = false,
  initiallyVerified = false,
  onVerificationStatusChange,
}: PhoneFieldProps) {
  const { showError: showToastError, showSuccess } = useToast();
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState<string | undefined>(undefined);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isVerified, setIsVerified] = useState(initiallyVerified);
  const [verifiedPhone, setVerifiedPhone] = useState('');
  const {
    secondsLeft,
    isExpired,
    reset: resetOtpCountdown,
    stop: stopOtpCountdown,
  } = useCountdown({
    initialSeconds: 60,
    autoStart: false,
  });

  const formattedPhone = useMemo(() => {
    const cleanPhone = value.replace(/\s+/g, '');
    return `${countryCode} ${cleanPhone}`.trim();
  }, [value, countryCode]);

  const canVerify = validator(value) === undefined;

  useEffect(() => {
    if (initiallyVerified) {
      setIsVerified(true);
      setVerifiedPhone(formattedPhone);
      onVerificationStatusChange?.(true);
    }
    // only for first render default state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isGuest) return;

    const stillVerified =
      isVerified && verifiedPhone && verifiedPhone === formattedPhone;
    if (!stillVerified) {
      if (isVerified) {
        setIsVerified(false);
        onVerificationStatusChange?.(false);
      }
      setIsOtpSent(false);
      setOtp('');
      setOtpError(undefined);
      stopOtpCountdown();
    }
  }, [
    formattedPhone,
    isGuest,
    isVerified,
    verifiedPhone,
    stopOtpCountdown,
    onVerificationStatusChange,
  ]);

  const handleSendOtp = async () => {
    if (!isGuest || !canVerify || isSendingOtp) {
      return;
    }

    setIsSendingOtp(true);
    setOtpError(undefined);

    try {
      await userService.sendGuestOTP({
        mobile_number: formattedPhone,
        otp_type: 'guest_verify',
      });
      setIsOtpSent(true);
      setOtp('');
      resetOtpCountdown();
      showSuccess('OTP sent to your phone number.');
    } catch (err) {
      const parsedError = err as ParsedAPIError;
      const message = parsedError.generalError || 'Failed to send OTP.';
      setOtpError(message);
      showToastError(message);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async (codeValue: string) => {
    if (!isGuest || codeValue.length !== 5) {
      setOtpError('Enter a valid OTP.');
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError(undefined);

    try {
      await userService.verifyGuestOTP({
        mobile_number: formattedPhone,
        otp: codeValue,
        otp_type: 'guest_verify',
      });

      setIsVerified(true);
      setVerifiedPhone(formattedPhone);
      setIsOtpSent(false);
      setOtp('');
      stopOtpCountdown();
      onVerificationStatusChange?.(true);
      showSuccess('Phone number verified successfully.');
    } catch (err) {
      const parsedError = err as ParsedAPIError;
      const message =
        parsedError.generalError ||
        parsedError.fieldErrors.otp ||
        'Invalid OTP.';
      setOtpError(message);
      showToastError(message);
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    if (!isGuest || !isExpired || isResendingOtp) {
      return;
    }

    setIsResendingOtp(true);
    setOtpError(undefined);

    try {
      await userService.sendGuestOTP({
        mobile_number: formattedPhone,
        otp_type: 'guest_verify',
      });
      setOtp('');
      resetOtpCountdown();
      showSuccess('A new OTP has been sent.');
    } catch (err) {
      const parsedError = err as ParsedAPIError;
      const message = parsedError.generalError || 'Failed to resend OTP.';
      setOtpError(message);
      showToastError(message);
    } finally {
      setIsResendingOtp(false);
    }
  };

  return (
    <div className="w-full">
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
        htmlFor="address-phone"
      >
        {label}
        {required ? <span className="text-red-500">*</span> : null}
      </label>
      <div className="flex items-start gap-2">
        <div className="shrink-0">
          <CountryPicker
            className="py-3"
            value={countryCode}
            onChange={onCountryCodeChange}
          />
        </div>
        <div className="flex-1">
          <FormInput
            id="address-phone"
            type="tel"
            inputMode="tel"
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) {
                onChange(e);
              }
            }}
            onBlur={onBlur}
            validator={validator}
            error={error}
            showError={showError}
            rightElement={
              isGuest ? (
                <button
                  type="button"
                  onClick={() => void handleSendOtp()}
                  disabled={isVerified || !canVerify || isSendingOtp}
                  className={`inline-flex items-center gap-1 text-xs font-semibold ${
                    isVerified
                      ? 'text-green-600 cursor-default'
                      : canVerify && !isSendingOtp
                        ? 'text-deep-maroon hover:underline'
                        : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isVerified ? (
                    <FiCheckCircle className="h-3.5 w-3.5" />
                  ) : null}
                  {isSendingOtp
                    ? 'Sending...'
                    : isVerified
                      ? 'Verified'
                      : 'Verify'}
                </button>
              ) : null
            }
          />

          {isGuest && !isVerified && isOtpSent ? (
            <div className="mt-3 space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
              <VerifyCodeInput
                maxLength={5}
                inputType="number"
                value={otp}
                onChange={(next) => {
                  setOtp(next);
                  if (otpError) {
                    setOtpError(undefined);
                  }
                }}
                onComplete={(next) => {
                  if (next.length === 5) {
                    void handleVerifyOtp(next);
                  }
                }}
                error={otpError}
                showError={!!otpError}
                disabled={isVerifyingOtp}
                containerClassName="w-full"
              />

              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => void handleVerifyOtp(otp)}
                  disabled={otp.length !== 5 || isVerifyingOtp}
                  className="inline-flex items-center gap-2 rounded-md bg-deep-maroon px-3 py-1.5 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isVerifyingOtp ? (
                    <>
                      <ImSpinner2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <span>Verify OTP</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => void handleResendOtp()}
                  disabled={!isExpired || isResendingOtp}
                  className="text-xs font-medium text-deep-maroon hover:underline disabled:cursor-not-allowed disabled:text-gray-400 disabled:no-underline"
                >
                  {isResendingOtp
                    ? 'Resending...'
                    : isExpired
                      ? 'Resend OTP'
                      : `Resend in ${secondsLeft}s`}
                </button>
              </div>
            </div>
          ) : null}

          {isGuest && !isVerified && !isOtpSent && canVerify ? (
            <p className="mt-2 text-xs text-amber-700">
              Verify your phone number before saving this address.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
