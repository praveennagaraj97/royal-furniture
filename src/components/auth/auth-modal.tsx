'use client';

import verticalLogo from '@/assets/vertical-logo.svg';
import { ConfirmationModal } from '@/components/shared/confirmation-modal';
import Modal from '@/components/shared/modal';
import AppleIcon from '@/components/shared/svgs/apple-icon';
import GoogleIcon from '@/components/shared/svgs/google-icon';
import { motion, type Variants } from 'framer-motion';
import { Facebook } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState, type FC } from 'react';
import ForgotPasswordForm from './forgot-password-form';
import LoginForm from './login-form';
import SignupForm from './signup';

const socialContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const socialItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

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
        variant="bottom"
        size="md"
        className="sm:max-w-md w-full"
        preventClose={hasFormValues}
        onCloseAttempt={handleCloseAttempt}
      >
        <div className="flex flex-col max-h-[80vh] sm:max-h-[90vh] overflow-y-auto pb-safe sm:pb-6">
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
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="flex items-center gap-4 my-6"
                >
                  <div className="flex-1 h-px bg-gray-300" />
                  <span className="text-sm text-gray-600">{t('forms.orContinueWith')}</span>
                  <div className="flex-1 h-px bg-gray-300" />
                </motion.div>

                {/* Social Login Icons */}
                <motion.div
                  variants={socialContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center justify-center gap-4"
                >
                  {/* Facebook */}
                  <motion.button
                    type="button"
                    variants={socialItemVariants}
                    onClick={() => handleSocialLogin('facebook')}
                    className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:scale-110 transition-transform duration-200"
                  >
                    <Facebook className="w-5 h-5 text-[#1877F2]" />
                  </motion.button>

                  {/* Google */}
                  <motion.button
                    type="button"
                    variants={socialItemVariants}
                    onClick={() => handleSocialLogin('google')}
                    className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:scale-110 transition-transform duration-200"
                  >
                    <GoogleIcon className="w-5 h-5" />
                  </motion.button>

                  {/* Apple */}
                  <motion.button
                    type="button"
                    variants={socialItemVariants}
                    onClick={() => handleSocialLogin('apple')}
                    className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:scale-110 transition-transform duration-200"
                  >
                    <AppleIcon className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              </>
            )}
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
