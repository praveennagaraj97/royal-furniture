'use client';

import { useRouter } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

interface BackLinkProps {
  onClick?: () => void;
  href?: string;
}

export const BackLink: FC<BackLinkProps> = ({ onClick, href }) => {
  const router = useRouter();
  const t = useTranslations('common');

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <motion.div
      className="container mx-auto px-3 py-2"
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center gap-2 text-gray-700 hover:text-deep-maroon transition-all duration-200 group"
      >
        <ArrowLeft className="h-5 w-5 text-deep-maroon transition-transform duration-200 group-hover:-translate-x-1" />
        <span className="font-medium">{t('back')}</span>
      </button>
    </motion.div>
  );
};
