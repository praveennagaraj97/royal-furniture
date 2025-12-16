'use client';

import { motion } from 'framer-motion';
import { Route, Store, Truck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

type QuickLink = {
  labelKey: string;
  icon: typeof Truck;
};

const primaryLinks: QuickLink[] = [
  { labelKey: 'freeShipping', icon: Truck },
  { labelKey: 'clickAndCollect', icon: Store },
  { labelKey: 'trackOrder', icon: Route },
];

const secondaryLinkKeys = ['storeLocator', 'help', 'sellWithUs'];

const QuickLinksBar: FC = () => {
  const t = useTranslations('quickLinks');

  return (
    <div className="bg-soft-pink text-indigo-slate">
      <div className="container mx-auto px-3 py-2.5 sm:px-4 md:px-6 md:py-2">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 sm:gap-x-6">
          {/* Primary Links */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            {primaryLinks.map(({ labelKey, icon: Icon }, index) => (
              <motion.div
                key={labelKey}
                className="flex items-center gap-1.5 text-xs font-semibold sm:gap-2 lg:text-sm"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.25,
                  ease: 'easeOut',
                }}
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
          </div>

          {/* Secondary Links */}
          <div className="flex items-center gap-3 text-xs font-semibold sm:gap-4 md:gap-6">
            {secondaryLinkKeys.map((labelKey, index) => (
              <motion.a
                key={labelKey}
                href="#"
                className="whitespace-nowrap transition-colors hover:text-indigo-700"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15 + index * 0.05,
                  duration: 0.25,
                  ease: 'easeOut',
                }}
                whileHover={{ y: -1 }}
              >
                {t(labelKey)}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickLinksBar;
