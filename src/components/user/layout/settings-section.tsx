'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import {
  FiBookmark,
  FiChevronRight,
  FiGlobe,
  FiSettings,
} from 'react-icons/fi';

const SettingsSection: FC = () => {
  const t = useTranslations('user.settings');

  const settingsItems = [
    {
      key: 'savedForLater',
      icon: FiBookmark,
      href: '#',
    },
    {
      key: 'notificationsSettings',
      icon: FiSettings,
      href: '#',
    },
    {
      key: 'selectLanguage',
      icon: FiGlobe,
      href: '#',
    },
  ];

  return (
    <StaggerContainer
      staggerChildren={0.1}
      delayChildren={0.1}
      className="mb-6"
    >
      <StaggerItem
        type="slide"
        direction="left"
        distance={20}
        duration={0.4}
        className="text-lg font-semibold text-gray-900 mb-3"
      >
        <h3>{t('title')}</h3>
      </StaggerItem>
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-2">
        <div className="space-y-1">
          {settingsItems.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem
                key={item.key}
                type="slide"
                direction="left"
                distance={20}
                duration={0.4}
              >
                <Link
                  href={item.href}
                  className="flex items-center justify-between p-3 rounded hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700 font-medium">
                      {t(item.key)}
                    </span>
                  </div>
                  <FiChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </Link>
              </StaggerItem>
            );
          })}
        </div>
      </div>
    </StaggerContainer>
  );
};

export default SettingsSection;
