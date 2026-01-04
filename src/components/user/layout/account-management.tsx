'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { ConfirmationModal } from '@/components/shared/confirmation-modal';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/contexts/toast-context';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { FiChevronRight, FiLogOut, FiUserMinus } from 'react-icons/fi';

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
      icon: FiUserMinus,
      href: '#',
      onClick: undefined,
    },
    {
      key: 'logout',
      icon: FiLogOut,
      href: '#',
      onClick: handleLogoutClick,
    },
  ];

  return (
    <>
      <StaggerContainer
        className="mb-6"
        staggerChildren={0.1}
        delayChildren={0.1}
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
                  <FiChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              );

              return (
                <StaggerItem
                  key={item.key}
                  type="slide"
                  direction="left"
                  distance={20}
                  duration={0.4}
                >
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
                </StaggerItem>
              );
            })}
          </div>
        </div>
      </StaggerContainer>

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
