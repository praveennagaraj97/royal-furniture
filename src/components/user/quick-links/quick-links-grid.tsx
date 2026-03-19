'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { AppLink } from '@/hooks';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { FiHeart, FiMapPin, FiPackage, FiUser } from 'react-icons/fi';

const QuickLinksGrid: FC = () => {
  const t = useTranslations('user.quickLinks');

  const quickLinks = [
    {
      key: 'myOrders',
      icon: FiPackage,
      href: '/user/orders',
    },
    {
      key: 'myProfile',
      icon: FiUser,
      href: '/user/profile',
    },
    {
      key: 'wishlist',
      icon: FiHeart,
      href: '/user/wishlist',
    },
    {
      key: 'savedAddresses',
      icon: FiMapPin,
      href: '/user/address',
    },
  ];

  return (
    <StaggerContainer
      staggerChildren={0.1}
      delayChildren={0.1}
      className="grid sm:grid-cols-2 gap-4"
    >
      {quickLinks.map((link) => {
        const Icon = link.icon;
        return (
          <StaggerItem
            key={link.key}
            type="slideScale"
            direction="up"
            distance={20}
            initialScale={0.9}
            duration={0.4}
          >
            <AppLink
              href={link.href}
              className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-sm shadow-sm hover:bg-gray-50 hover:shadow-md hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-out group"
            >
              <Icon className="h-6 w-6 text-deep-maroon shrink-0 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-deep-maroon transition-colors duration-300">
                {t(link.key)}
              </span>
            </AppLink>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
};

export default QuickLinksGrid;
