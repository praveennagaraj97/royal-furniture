'use client';

import { Link } from '@/i18n/routing';
import { motion, type Variants } from 'framer-motion';
import {
  Bookmark,
  ChevronRight,
  Languages,
  Settings as SettingsIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

const SettingsSection: FC = () => {
  const t = useTranslations('user.settings');

  const settingsItems = [
    {
      key: 'savedForLater',
      icon: Bookmark,
      href: '#',
    },
    {
      key: 'notificationsSettings',
      icon: SettingsIcon,
      href: '#',
    },
    {
      key: 'selectLanguage',
      icon: Languages,
      href: '#',
    },
  ];

  return (
    <motion.div
      className="mb-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <motion.h3
        className="text-lg font-semibold text-gray-900 mb-3"
        variants={itemVariants}
      >
        {t('title')}
      </motion.h3>
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-2">
        <div className="space-y-1">
          {settingsItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.key} variants={itemVariants}>
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
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsSection;
