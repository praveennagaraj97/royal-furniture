'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { AppLink } from '@/hooks';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import {
  FiChevronRight,
  FiFileText,
  FiHeadphones,
  FiHelpCircle,
  FiHome,
  FiShield,
} from 'react-icons/fi';
import { GrReturn } from 'react-icons/gr';

const FeedbackInfoSection: FC = () => {
  const t = useTranslations('user.feedback');

  const feedbackItems = [
    {
      key: 'returnPolicy',
      icon: GrReturn,
      href: '#',
    },
    {
      key: 'privacyPolicy',
      icon: FiShield,
      href: '#',
    },
    {
      key: 'termsConditions',
      icon: FiFileText,
      href: '#',
    },
    {
      key: 'contactUs',
      icon: FiHeadphones,
      href: '#',
    },
    {
      key: 'faqs',
      icon: FiHelpCircle,
      href: '#',
    },
    {
      key: 'aboutUs',
      icon: FiHome,
      href: '#',
    },
  ];

  return (
    <StaggerContainer
      staggerChildren={0.08}
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
          {feedbackItems.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem
                key={item.key}
                type="slide"
                direction="left"
                distance={20}
                duration={0.4}
              >
                <AppLink
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
                </AppLink>
              </StaggerItem>
            );
          })}
        </div>
      </div>
    </StaggerContainer>
  );
};

export default FeedbackInfoSection;
