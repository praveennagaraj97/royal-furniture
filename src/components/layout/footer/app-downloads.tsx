'use client';

import { motion, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';

import appStoreBadge from '@/assets/app-store-badge.svg';
import googlePlayBadge from '@/assets/google-play-badge.svg';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const AppDownloads: FC = () => {
  const t = useTranslations('footer.appDownloads');

  return (
    <motion.div className="flex flex-col gap-3" variants={itemVariants}>
      <p className="text-gray-700 text-sm font-medium">{t('downloadOurApp')}</p>
      <div className="flex flex-wrap gap-3">
        {/* Google Play Badge */}
        <a
          href="#"
          className="inline-block hover:opacity-80 transition-opacity duration-200"
        >
          <Image
            src={googlePlayBadge}
            alt={t('getItOnGooglePlay')}
            width={162}
            height={48}
            className="h-12 w-auto"
          />
        </a>
        {/* App Store Badge */}
        <a
          href="#"
          className="inline-block hover:opacity-80 transition-opacity duration-200"
        >
          <Image
            src={appStoreBadge}
            alt={t('downloadOnAppStore')}
            width={162}
            height={48}
            className="h-12 w-auto"
          />
        </a>
      </div>
    </motion.div>
  );
};

export default AppDownloads;
