'use client';

import facebookIcon from '@/assets/social/facebook.png';
import verticalLogo from '@/assets/vertical-logo.svg';
import { FormInput } from '@/components/shared/inputs/form-input';
import Modal from '@/components/shared/modal';
import { loginFormValidators, signupFormValidators } from '@/validators';
import Image from 'next/image';
import { useState, type FC, type FormEvent } from 'react';

interface SignupFormProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'signup' | 'login';

const SignupForm: FC<SignupFormProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('signup');
  const [showErrors, setShowErrors] = useState(false);

  // Signup form state
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
  });

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleSignupChange =
    (field: keyof typeof signupData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSignupData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleLoginChange =
    (field: keyof typeof loginData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSignupSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowErrors(true);

    // Validate all fields
    const errors = {
      firstName: signupFormValidators.firstName(signupData.firstName),
      lastName: signupFormValidators.lastName(signupData.lastName),
      email: signupFormValidators.email(signupData.email),
      mobileNumber: signupFormValidators.mobileNumber(signupData.mobileNumber),
      password: signupFormValidators.password(signupData.password),
      confirmPassword: signupFormValidators.confirmPassword(
        signupData.confirmPassword,
        signupData.password
      ),
    };

    const hasErrors = Object.values(errors).some(
      (error) => error !== undefined
    );
    if (!hasErrors) {
      // Handle successful signup
      console.log('Signup data:', signupData);
    }
  };

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowErrors(true);

    // Validate all fields
    const errors = {
      email: loginFormValidators.email(loginData.email),
      password: loginFormValidators.password(loginData.password),
    };

    const hasErrors = Object.values(errors).some(
      (error) => error !== undefined
    );
    if (!hasErrors) {
      // Handle successful login
      console.log('Login data:', loginData);
    }
  };

  const handleSocialLogin = (provider: 'facebook' | 'google' | 'apple') => {
    console.log(`Social login with ${provider}`);
    // Handle social login
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="bottom"
      size="md"
      className="max-w-md w-full"
    >
      <div className="flex flex-col max-h-[95vh] sm:max-h-[90vh] overflow-y-auto pb-safe sm:pb-6">
        {/* Logo */}
        <div className="flex justify-center pt-6 px-6">
          <Image
            src={verticalLogo}
            alt="Royal Furniture"
            width={120}
            height={80}
            className="h-auto w-auto object-contain"
            priority
          />
        </div>

        {/* Tabs */}
        <div className="px-6 pt-6">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => {
                setActiveTab('signup');
                setShowErrors(false);
              }}
              className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeTab === 'signup'
                  ? 'bg-soft-pink text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              SIGN UP
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setShowErrors(false);
              }}
              className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeTab === 'login'
                  ? 'bg-soft-pink text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              LOGIN
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 px-6 pt-6 pb-6">
          {activeTab === 'signup' ? (
            <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4">
              <FormInput
                id="firstName"
                type="text"
                placeholder="First name"
                value={signupData.firstName}
                onChange={handleSignupChange('firstName')}
                validator={signupFormValidators.firstName}
                showError={showErrors}
              />
              <FormInput
                id="lastName"
                type="text"
                placeholder="Last name"
                value={signupData.lastName}
                onChange={handleSignupChange('lastName')}
                validator={signupFormValidators.lastName}
                showError={showErrors}
              />
              <FormInput
                id="email"
                type="email"
                placeholder="Email ID"
                value={signupData.email}
                onChange={handleSignupChange('email')}
                validator={signupFormValidators.email}
                showError={showErrors}
              />
              <FormInput
                id="mobileNumber"
                type="tel"
                inputMode="numeric"
                placeholder="Mobile Number"
                value={signupData.mobileNumber}
                onChange={handleSignupChange('mobileNumber')}
                validator={signupFormValidators.mobileNumber}
                showError={showErrors}
              />
              <FormInput
                id="password"
                type="password"
                placeholder="Password"
                value={signupData.password}
                onChange={handleSignupChange('password')}
                validator={signupFormValidators.password}
                showError={showErrors}
              />
              <FormInput
                id="confirmPassword"
                type="password"
                placeholder="Re-enter Password"
                value={signupData.confirmPassword}
                onChange={handleSignupChange('confirmPassword')}
                validator={(value) =>
                  signupFormValidators.confirmPassword(
                    value,
                    signupData.password
                  )
                }
                showError={showErrors}
              />

              <button
                type="submit"
                className="w-full bg-deep-maroon text-white py-3 rounded-lg font-semibold text-base hover:bg-[#6b0000] transition-colors duration-200 mt-2"
              >
                Sign Up
              </button>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
              <FormInput
                id="loginEmail"
                type="email"
                placeholder="Email ID"
                value={loginData.email}
                onChange={handleLoginChange('email')}
                validator={loginFormValidators.email}
                showError={showErrors}
              />
              <FormInput
                id="loginPassword"
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange('password')}
                validator={loginFormValidators.password}
                showError={showErrors}
              />

              <button
                type="submit"
                className="w-full bg-deep-maroon text-white py-3 rounded-lg font-semibold text-base hover:bg-[#6b0000] transition-colors duration-200 mt-2"
              >
                Login
              </button>
            </form>
          )}

          {/* Separator */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-sm text-gray-600">Or continue with</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Social Login Icons */}
          <div className="flex items-center justify-center gap-4">
            {/* Facebook */}
            <button
              type="button"
              onClick={() => handleSocialLogin('facebook')}
              className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:scale-110 transition-transform duration-200"
            >
              <Image
                src={facebookIcon}
                alt="Facebook"
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
            </button>

            {/* Google */}
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:scale-110 transition-transform duration-200"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            </button>

            {/* Apple */}
            <button
              type="button"
              onClick={() => handleSocialLogin('apple')}
              className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:scale-110 transition-transform duration-200"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SignupForm;
