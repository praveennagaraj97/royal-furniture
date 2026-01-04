'use client';

import { SlideIn } from '@/components/shared/animations';
import { HeaderAuthSkeleton } from '@/components/skeletons/header-auth-skeleton';
import { useAuth } from '@/contexts/auth-context';
import { useUser } from '@/contexts/user-context';
import { useUserInitials } from '@/hooks/use-user-initials';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useMemo, type FC } from 'react';
import { FiLogIn } from 'react-icons/fi';

interface AuthActionButtonProps {
  onClick: () => void;
}

export const AuthActionButton: FC<AuthActionButtonProps> = ({ onClick }) => {
  const { isAuthenticated } = useAuth();
  const { user, isLoading } = useUser();
  const t = useTranslations('common');
  const userInitials = useUserInitials(user);

  const displayName = useMemo(() => {
    if (!user) return 'User';
    const firstName = user.first_name?.trim() || '';
    const lastName = user.last_name?.trim() || '';
    if (firstName && lastName) return `${firstName} ${lastName}`;
    if (firstName) return firstName;
    if (lastName) return lastName;
    return user.email || 'User';
  }, [user]);

  if (isLoading) {
    return <HeaderAuthSkeleton />;
  }

  if (isAuthenticated && user) {
    return (
      <SlideIn
        direction="down"
        distance={4}
        duration={0.25}
        delay={0.15}
        triggerOnView={false}
        className="inline-block"
      >
        <Link href="/user">
          <motion.button
            className="flex shrink-0 items-center gap-2 rounded-full p-1.5 pe-3 text-sm font-medium text-black bg-gray-50 hover:text-[#7F1D1D] hover:bg-gray-100 transition-colors"
            whileHover={{ y: -1 }}
            type="button"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7F1D1D] text-white font-semibold text-xs">
              {userInitials || 'U'}
            </span>
            <span className="truncate max-w-[120px]">{displayName}</span>
          </motion.button>
        </Link>
      </SlideIn>
    );
  }

  return (
    <SlideIn
      direction="down"
      distance={4}
      duration={0.25}
      delay={0.15}
      triggerOnView={false}
      className="inline-block"
    >
      <motion.button
        className="flex shrink-0 items-center gap-2 rounded-full p-1.5 pe-3 text-sm font-medium text-black bg-gray-50 hover:text-[#7F1D1D] hover:bg-gray-100 transition-colors"
        whileHover={{ y: -1 }}
        type="button"
        onClick={onClick}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7F1D1D] text-white">
          <FiLogIn className="h-5 w-5" />
        </span>
        <span>{t('signInOrSignUp')}</span>
      </motion.button>
    </SlideIn>
  );
};
