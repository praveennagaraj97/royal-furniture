'use client';

import { type FC, useState } from 'react';
import EmailOtpLogin from './login/email-otp-login';
import EmailPasswordLogin from './login/email-password-login';
import PhoneOtpLogin from './login/phone-otp-login';

type LoginMode = 'email-password' | 'phone-otp' | 'email-otp';

interface LoginFormProps {
  onFormStateChange?: (hasValues: boolean) => void;
  onClose?: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ onFormStateChange, onClose }) => {
  const [loginMode, setLoginMode] = useState<LoginMode>('email-password');

  const handleModeChange = (mode: LoginMode) => {
    setLoginMode(mode);
  };

  return (
    <div className="flex flex-col gap-4">
      {loginMode === 'email-password' && (
        <EmailPasswordLogin
          onModeChange={handleModeChange}
          onFormStateChange={onFormStateChange}
          onLoginSuccess={onClose}
        />
      )}

      {loginMode === 'phone-otp' && (
        <PhoneOtpLogin onModeChange={handleModeChange} />
      )}

      {loginMode === 'email-otp' && (
        <EmailOtpLogin
          onModeChange={handleModeChange}
          onFormStateChange={onFormStateChange}
          onLoginSuccess={onClose}
        />
      )}
    </div>
  );
};

export default LoginForm;
