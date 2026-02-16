'use client';

import { useTranslations } from 'next-intl';
import { type FC, useState } from 'react';
import EmailReset from './forgot-password/email-reset';
import PhoneReset from './forgot-password/phone-reset';

type ForgotPasswordMode = 'email-reset' | 'phone-reset';

interface ForgotPasswordFormProps {
  onFormStateChange?: (hasValues: boolean) => void;
  onClose?: () => void;
  onBackToLogin?: () => void;
}

const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({
  onFormStateChange,
  onClose,
  onBackToLogin,
}) => {
  const [resetMode, setResetMode] = useState<ForgotPasswordMode>('email-reset');
  const t = useTranslations('auth');

  const handleModeChange = (mode: ForgotPasswordMode) => {
    setResetMode(mode);
  };

  const handleSuccess = () => {
    // After successful password reset request, close the modal
    onFormStateChange?.(false);
    onClose?.();
  };

  return (
    <div className="flex flex-col gap-4">
      {resetMode === 'email-reset' && (
        <EmailReset
          onModeChange={handleModeChange}
          onFormStateChange={onFormStateChange}
          onSuccess={handleSuccess}
        />
      )}

      {resetMode === 'phone-reset' && (
        <PhoneReset
          onModeChange={handleModeChange}
          onFormStateChange={onFormStateChange}
          onSuccess={handleSuccess}
          onBackToLogin={onBackToLogin}
        />
      )}

      {/* Back to Login Button */}
      {onBackToLogin && (
        <div className="pt-2">
          <button
            type="button"
            onClick={onBackToLogin}
            className="w-full text-sm text-gray-600 hover:  font-medium transition-colors duration-200"
          >
            {t('forms.backToLogin')}
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
