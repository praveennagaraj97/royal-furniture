'use client';

import { HeaderAuthSkeleton } from '@/components/skeletons/header-auth-skeleton';
import { useAuth } from '@/contexts/auth-context';
import { useUser } from '@/contexts/user-context';
import { useUserInitials } from '@/hooks/use-user-initials';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

interface AuthActionButtonProps {
  onClick: () => void;
}

export const AuthActionButton: FC<AuthActionButtonProps> = ({ onClick }) => {
  const { isAuthenticated } = useAuth();
  const { user, isLoading } = useUser();
  const t = useTranslations('common');
  const userInitials = useUserInitials(user);

  if (isLoading) {
    return <HeaderAuthSkeleton />;
  }

  if (isAuthenticated && user && userInitials) {
    return (
      <Link href="/user">
        <motion.button
          className="flex shrink-0 items-center gap-2 rounded-full p-1.5 pe-3 text-sm font-medium text-gray-600 bg-gray-50 hover:text-[#7F1D1D] hover:bg-gray-100 transition-colors"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.25, ease: 'easeOut' }}
          whileHover={{ y: -1 }}
          type="button"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7F1D1D] text-white font-semibold text-xs">
            {userInitials}
          </span>
          <span className="truncate max-w-[120px]">{user.display_name}</span>
        </motion.button>
      </Link>
    );
  }

  return (
    <motion.button
      className="flex shrink-0 items-center gap-2 rounded-full p-1.5 pe-3 text-sm font-medium text-gray-600 bg-gray-50 hover:text-[#7F1D1D] hover:bg-gray-100 transition-colors"
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.25, ease: 'easeOut' }}
      whileHover={{ y: -1 }}
      type="button"
      onClick={onClick}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7F1D1D] text-white">
        <LogIn className="h-5 w-5" />
      </span>
      <span>{t('signInOrSignUp')}</span>
    </motion.button>
  );
};
