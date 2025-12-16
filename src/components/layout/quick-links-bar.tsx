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
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-6">
          {primaryLinks.map(({ labelKey, icon: Icon }, index) => (
            <motion.div
              key={labelKey}
              className="flex items-center gap-2 text-sm font-semibold"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.05,
                duration: 0.25,
                ease: 'easeOut',
              }}
              whileHover={{ y: -1 }}
            >
              <Icon className="h-4 w-4" strokeWidth={1.75} />
              <span>{t(labelKey)}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-6 text-xs font-semibold">
          {secondaryLinkKeys.map((labelKey, index) => (
            <motion.a
              key={labelKey}
              href="#"
              className="transition-colors hover:text-indigo-700"
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
  );
};

export default QuickLinksBar;
