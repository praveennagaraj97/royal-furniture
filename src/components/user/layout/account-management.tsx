'use client';

import { ConfirmationModal } from '@/components/shared/confirmation-modal';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/contexts/toast-context';
import { Link } from '@/i18n/routing';
import { motion, type Variants } from 'framer-motion';
import { ChevronRight, LogOut, UserMinus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

const AccountManagement: FC = () => {
  const { logout } = useAuth();
  const { showSuccess } = useToast();
  const t = useTranslations('user.account');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    showSuccess(t('logoutSuccess'));
    logout();
  };

  const accountItems = [
    {
      key: 'deleteAccount',
      icon: UserMinus,
      href: '#',
      onClick: undefined,
    },
    {
      key: 'logout',
      icon: LogOut,
      href: '#',
      onClick: handleLogoutClick,
    },
  ];

  return (
    <>
      <motion.div
        className="mb-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-2">
          <div className="space-y-1">
            {accountItems.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="flex items-center justify-between p-3 rounded hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700 font-medium">
                      {t(item.key)}
                    </span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              );

              return (
                <motion.div key={item.key} variants={itemVariants}>
                  {item.onClick ? (
                    <button
                      type="button"
                      onClick={item.onClick}
                      className="w-full text-left"
                    >
                      {content}
                    </button>
                  ) : (
                    <Link href={item.href} className="block">
                      {content}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
        title={t('logoutConfirmTitle')}
        message={t('logoutConfirmMessage')}
        confirmText={t('logoutConfirmButton')}
        cancelText={t('logoutCancelButton')}
        variant="danger"
      />
    </>
  );
};

export default AccountManagement;
