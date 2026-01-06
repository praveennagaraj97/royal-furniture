'use client';

import { StaggerContainer } from '@/components/shared/animations';
import { AppLink } from '@/hooks';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { FiNavigation, FiShoppingBag, FiTruck } from 'react-icons/fi';

type QuickLink = {
  labelKey: string;
  icon: typeof FiTruck;
};

const primaryLinks: QuickLink[] = [
  { labelKey: 'freeShipping', icon: FiTruck },
  { labelKey: 'clickAndCollect', icon: FiShoppingBag },
  { labelKey: 'trackOrder', icon: FiNavigation },
];

const secondaryLinkKeys = ['storeLocator', 'help', 'sellWithUs'];

const QuickLinksBar: FC = () => {
  const t = useTranslations('quickLinks');

  return (
    <div className="bg-soft-pink text-indigo-slate">
      <div className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3 py-2.5 md:py-2">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 sm:gap-x-6">
          {/* Primary Links */}
          <StaggerContainer
            mode="animate"
            staggerChildren={0.05}
            delayChildren={0}
            duration={0.25}
            className="flex items-center gap-3 sm:gap-4 md:gap-6"
          >
            {primaryLinks.map(({ labelKey, icon: Icon }) => (
              <motion.div
                key={labelKey}
                className="flex items-center gap-1.5 text-xs font-semibold sm:gap-2 lg:text-sm"
                whileHover={{ y: -1 }}
                title={t(labelKey)}
              >
                <Icon
                  className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4"
                  strokeWidth={1.75}
                />
                <span className="hidden whitespace-nowrap lg:inline">
                  {t(labelKey)}
                </span>
              </motion.div>
            ))}
          </StaggerContainer>

          {/* Secondary Links */}
          <StaggerContainer
            mode="animate"
            staggerChildren={0.05}
            delayChildren={0.15}
            duration={0.25}
            className="flex items-center gap-3 text-xs font-semibold sm:gap-4 md:gap-6"
          >
            {secondaryLinkKeys.map((labelKey) => (
              <motion.div key={labelKey} whileHover={{ y: -1 }}>
                <AppLink
                  href="#"
                  className="whitespace-nowrap transition-colors hover:text-indigo-700"
                >
                  {t(labelKey)}
                </AppLink>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </div>
  );
};

export default QuickLinksBar;
