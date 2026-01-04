'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { FC } from 'react';
import { FiNavigation, FiShoppingBag, FiTruck } from 'react-icons/fi';

interface QuickLinksSectionProps {
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
  itemVariants: {
    hidden: { opacity: number; x: number };
    visible: { opacity: number; x: number };
    exit: { opacity: number; x: number };
  };
}

export const QuickLinksSection: FC<QuickLinksSectionProps> = ({
  isVisible,
  containerVariants,
  itemVariants,
}) => {
  const tQuickLinks = useTranslations('quickLinks');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const quickLinks = [
    { labelKey: 'freeShipping', icon: FiTruck },
    { labelKey: 'clickAndCollect', icon: FiShoppingBag },
    { labelKey: 'trackOrder', icon: FiNavigation },
    { labelKey: 'storeLocator' },
    { labelKey: 'help' },
    { labelKey: 'sellWithUs' },
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      className="flex flex-col gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {quickLinks.map((link) => {
        const Icon = link.icon;
        return (
          <motion.div key={link.labelKey} variants={itemVariants}>
            {Icon ? (
              <div className="flex items-center gap-2 px-1 py-2 text-sm text-gray-700">
                <Icon className="h-4 w-4 shrink-0" />
                <span className="font-semibold">
                  {tQuickLinks(link.labelKey)}
                </span>
              </div>
            ) : (
              <a
                href="#"
                className="flex items-center gap-2 px-1 py-2 text-sm text-gray-700 hover:text-[#7F1D1D] transition-colors"
              >
                <span className="font-semibold">
                  {tQuickLinks(link.labelKey)}
                </span>
              </a>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
};
