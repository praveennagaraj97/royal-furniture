'use client';

import { useUser } from '@/contexts/user-context';
import { motion } from 'framer-motion';
import { SquarePen } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

const UserProfileHeader: FC = () => {
  const { user } = useUser();
  const t = useTranslations('user');

  const displayName = user?.display_name || 'User';
  const email = user?.email || '';

  return (
    <motion.div
      className="bg-deep-maroon rounded-sm p-4 mb-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-white text-lg font-semibold mb-1">
            {t('greeting', { name: displayName })}
          </h2>
          <p className="text-white/90 text-sm">{email}</p>
        </div>
        <button
          type="button"
          className="flex flex-col items-center gap-1.5 text-white hover:text-white/80 transition-colors ml-4"
        >
          <SquarePen className="h-4 w-4" />
          <span className="text-sm font-medium">{t('edit')}</span>
        </button>
      </div>
    </motion.div>
  );
};

export default UserProfileHeader;
