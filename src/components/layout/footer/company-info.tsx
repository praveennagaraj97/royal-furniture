'use client';

import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';

import logo from '@/assets/logo.svg';

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

const CompanyInfo: FC = () => {
  const t = useTranslations('footer.company');

  return (
    <motion.div className="flex flex-col gap-3" variants={itemVariants}>
      <div className="flex items-center gap-3">
        <Image src={logo} alt="Royal Furniture" />
      </div>
      <p className="text-gray-700 text-sm leading-relaxed max-w-md">
        {t('description')}
      </p>
      <button
        type="button"
        className="flex items-center justify-center gap-2 bg-deep-maroon text-white px-6 py-3 rounded-full font-medium hover:bg-[#6b0000] transition-colors duration-200 w-fit"
      >
        <span>{t('findOurStores')}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default CompanyInfo;
