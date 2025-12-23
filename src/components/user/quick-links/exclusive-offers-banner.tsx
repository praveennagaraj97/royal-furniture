'use client';

import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { ChevronRight, Percent } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

const ExclusiveOffersBanner: FC = () => {
  const t = useTranslations('user.exclusiveOffers');

  return (
    <motion.div
      className="bg-soft-pink rounded-sm p-4 mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Link href="#" className="flex items-center justify-between group">
        <div className="flex items-center gap-3">
          <Percent className="h-6 w-6 text-deep-maroon" />
          <span className="text-gray-900 font-semibold">{t('title')}</span>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-deep-maroon transition-colors" />
      </Link>
    </motion.div>
  );
};

export default ExclusiveOffersBanner;
