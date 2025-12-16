'use client';

import { FormInput } from '@/components/shared/inputs/form-input';
import { loginFormValidators } from '@/validators';
import { useState, type FC, type FormEvent } from 'react';

interface LoginFormProps {
  onSocialLogin?: (provider: 'facebook' | 'google' | 'apple') => void;
}

const LoginForm: FC<LoginFormProps> = ({ onSocialLogin }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [touched, setTouched] = useState<{
    email?: boolean;
    password?: boolean;
  }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFieldChange =
    (field: keyof typeof loginData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleBlur = (field: keyof typeof loginData) => () => {
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

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Mark all fields as touched on submit
    setTouched({ email: true, password: true });

    // Validate before submitting
    if (!validateForm()) {
      return;
    }

    // Handle successful login
    console.log('Login data:', loginData);
  };

  const handleSocialLogin = (provider: 'facebook' | 'google' | 'apple') => {
    if (onSocialLogin) {
      onSocialLogin(provider);
    } else {
      console.log(`Social login with ${provider}`);
    }
  };

  return (
    <>
      <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
        <FormInput
          id="loginEmail"
          type="email"
          placeholder="Email ID"
          value={loginData.email}
          onChange={handleFieldChange('email')}
          onBlur={handleBlur('email')}
          validator={loginFormValidators.email}
          error={errors.email}
          showError={!!touched.email || isSubmitted}
          containerClassName="w-full"
          className="bg-[#f8f8f8] border-0 rounded-lg text-gray-900 placeholder:text-gray-400"
        />
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
          className="bg-[#f8f8f8] border-0 rounded-lg text-gray-900 placeholder:text-gray-400"
        />

        <button
          type="submit"
          className="w-full bg-deep-maroon text-white py-3 rounded-lg font-semibold text-base hover:bg-[#6b0000] transition-colors duration-200 mt-2"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
