'use client';

import authBanner from '@/assets/auth_banner.png';
import verticalLogo from '@/assets/vertical-logo.svg';
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from '@/components/shared/animations';
import { ConfirmationModal } from '@/components/shared/confirmation-modal';
import Modal from '@/components/shared/modal';
import AppleIcon from '@/components/shared/svgs/apple-icon';
import GoogleIcon from '@/components/shared/svgs/google-icon';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, type FC } from 'react';
import { FaFacebook } from 'react-icons/fa';
import ForgotPasswordForm from './forgot-password-form';
import LoginForm from './login-form';
import SignupForm from './signup';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'signup' | 'login' | 'forgot-password';

const AuthModal: FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('signup');
  const [hasFormValues, setHasFormValues] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const t = useTranslations('auth');

  const handleSocialLogin = (provider: 'facebook' | 'google' | 'apple') => {
    console.log(`Social login with ${provider}`);
    // Handle social login
  };

  const handleCloseAttempt = () => {
    if (hasFormValues) {
      queueMicrotask(() => {
        setShowConfirmModal(true);
      });
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmModal(false);
    setHasFormValues(false);
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        variant="center"
        size="xl"
        className="w-full overflow-hidden rounded-3xl"
        preventClose={hasFormValues}
        onCloseAttempt={handleCloseAttempt}
      >
        <div className="flex flex-col md:flex-row h-full md:h-162 max-h-[90vh] pl-3">
          {/* Left Side - Image & Banner */}
          <div className="hidden md:flex relative w-1/2 flex-col bg-gray-50">
            <div className="absolute inset-0">
              <Image
                src={authBanner}
                alt="Auth Banner"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Curved White Bottom Overlay */}
            <div className="relative mt-auto">
              <div className="relative h-16 w-full overflow-hidden translate-y-1">
                <div className="absolute -left-[10%] -right-[10%] top-0 h-[200%] rounded-[100%] bg-white" />
              </div>
              <div className="bg-white pb-10 px-8 text-center relative z-10">
                {/* Slider Indicator */}
                <div className="flex justify-center gap-1.5 mb-5">
                  <div className="w-10 h-1.5 bg-deep-maroon rounded-full" />
                  <div className="w-10 h-1.5 bg-gray-200 rounded-full" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">
                  DESIGN & FURNISH YOUR <br /> DREAM SPACE
                </h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  Timeless designs, and unbeatable <br /> comfort all at your
                  fingertips!
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex-1 flex flex-col h-full overflow-y-auto pb-safe custom-scrollbar">
            {/* Logo */}
            <div className="flex justify-center pt-8 px-6 pb-2">
              <Image
                src={verticalLogo}
                alt="Royal Furniture"
                width={100}
                height={70}
                className="h-auto w-auto object-contain"
                priority
              />
            </div>

            {/* Tabs */}
            {activeTab !== 'forgot-password' && (
              <div className="px-6 pt-6">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab('signup')}
                    className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeTab === 'signup'
                        ? 'bg-soft-pink text-gray-900'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {t('forms.signUp').toUpperCase()}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeTab === 'login'
                        ? 'bg-soft-pink text-gray-900'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {t('forms.login').toUpperCase()}
                  </button>
                </div>
              </div>
            )}

            {/* Form Content */}
            <div className="flex-1 px-6 pt-6 pb-6">
              {activeTab === 'forgot-password' ? (
                <ForgotPasswordForm
                  onFormStateChange={setHasFormValues}
                  onClose={handleConfirmClose}
                  onBackToLogin={() => setActiveTab('login')}
                />
              ) : activeTab === 'signup' ? (
                <SignupForm
                  onFormStateChange={setHasFormValues}
                  onClose={handleConfirmClose}
                />
              ) : (
                <LoginForm
                  onFormStateChange={setHasFormValues}
                  onClose={handleConfirmClose}
                  onForgotPassword={() => setActiveTab('forgot-password')}
                />
              )}

              {/* Separator - Only show for signup and login */}
              {activeTab !== 'forgot-password' && (
                <>
                  <FadeIn
                    duration={0.3}
                    delay={0.5}
                    triggerOnView={false}
                    className="flex items-center gap-4 my-6"
                  >
                    <div className="flex-1 h-px bg-gray-300" />
                    <span className="text-sm text-gray-600">
                      {t('forms.orContinueWith')}
                    </span>
                    <div className="flex-1 h-px bg-gray-300" />
                  </FadeIn>

                  {/* Social Login Icons */}
                  <StaggerContainer
                    mode="animate"
                    staggerChildren={0.1}
                    delayChildren={0.1}
                    className="flex items-center justify-center gap-4"
                  >
                    {/* Facebook */}
                    <StaggerItem type="scale" initialScale={0.8} duration={0.3}>
                      <button
                        type="button"
                        onClick={() => handleSocialLogin('facebook')}
                        className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:scale-110 transition-transform duration-200"
                      >
                        <FaFacebook className="w-5 h-5 text-[#1877F2]" />
                      </button>
                    </StaggerItem>

                    {/* Google */}
                    <StaggerItem type="scale" initialScale={0.8} duration={0.3}>
                      <button
                        type="button"
                        onClick={() => handleSocialLogin('google')}
                        className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:scale-110 transition-transform duration-200"
                      >
                        <GoogleIcon className="w-5 h-5" />
                      </button>
                    </StaggerItem>

                    {/* Apple */}
                    <StaggerItem type="scale" initialScale={0.8} duration={0.3}>
                      <button
                        type="button"
                        onClick={() => handleSocialLogin('apple')}
                        className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:scale-110 transition-transform duration-200"
                      >
                        <AppleIcon className="w-5 h-5" />
                      </button>
                    </StaggerItem>
                  </StaggerContainer>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmClose}
        title={t('modal.discardChanges')}
        message={t('modal.unsavedChanges')}
        confirmText={t('modal.yesClose')}
        cancelText={t('modal.continueEditing')}
        variant="warning"
      />
    </>
  );
};

export default AuthModal;
