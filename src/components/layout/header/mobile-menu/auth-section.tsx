'use client';

import { useAuth } from '@/contexts/auth-context';
import { useUser } from '@/contexts/user-context';
import { useUserInitials } from '@/hooks/use-user-initials';
import { useRouter } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC, useMemo } from 'react';

interface AuthSectionProps {
  onSignIn: () => void;
  onClose: () => void;
  isVisible: boolean;
  containerVariants: {
    hidden: { opacity: number };
    visible: {
      opacity: number;
      transition: { staggerChildren: number; delayChildren: number };
    };
    exit: {
      opacity: number;
      transition: { staggerChildren: number; staggerDirection: number };
    };
  };
}

export const AuthSection: FC<AuthSectionProps> = ({
  onSignIn,
  onClose,
  isVisible,
  containerVariants,
}) => {
  const t = useTranslations('common');
  const { isAuthenticated } = useAuth();
  const { user, isLoading } = useUser();
  const userInitials = useUserInitials(user);
  const router = useRouter();

  const displayName = useMemo(() => {
    if (!user) return 'User';
    const firstName = user.first_name?.trim() || '';
    const lastName = user.last_name?.trim() || '';
    if (firstName && lastName) return `${firstName} ${lastName}`;
    if (firstName) return firstName;
    if (lastName) return lastName;
    return user.email || 'User';
  }, [user]);

  const getTruncatedDisplayName = (name: string): string => {
    const maxLength = 20;
    return name.length > maxLength
      ? `${name.substring(0, maxLength)}...`
      : name;
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="flex flex-col gap-2 mb-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {isLoading ? (
        <div className="h-12 rounded-xl bg-gray-200 animate-pulse" />
      ) : isAuthenticated && user ? (
        <button
          className="flex items-center gap-3 w-full px-4 py-3 bg-[#7F1D1D] text-white rounded-xl hover:bg-[#6B1919] transition-colors"
          type="button"
          onClick={() => {
            router.push('/user');
            onClose();
          }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#7F1D1D] font-semibold text-xs">
            {userInitials || 'U'}
          </span>
          <span className="text-base font-medium">
            {getTruncatedDisplayName(displayName)}
          </span>
        </button>
      ) : (
        <button
          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#7F1D1D] text-white rounded-xl hover:bg-[#6B1919] transition-colors"
          type="button"
          onClick={() => {
            onSignIn();
            onClose();
          }}
        >
          <LogIn className="h-5 w-5" />
          <span className="text-base font-medium">{t('signInOrSignUp')}</span>
        </button>
      )}
    </motion.div>
  );
};
