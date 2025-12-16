'use client';

import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

import Image from 'next/image';
import LangSwitch from './lang-switch';
import SearchBar from './search';
import Utilities from './utilities';

import logo from '@/assets/logo.svg';

const Header: FC = () => {
  const t = useTranslations('common');

  return (
    <header className="container mx-auto px-2 py-2.5 md:py-3">
      {/* Mobile/Tablet: Two-row layout */}
      <div className="flex flex-col gap-2 lg:hidden">
        {/* Top row: logo + utilities / actions */}
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <motion.div
            className="shrink-0 self-start"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 0.25, ease: 'easeOut' }}
          >
            <Image src={logo} alt="..." priority quality={100} />
          </motion.div>

          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div
              className="shrink-0"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.25, ease: 'easeOut' }}
            >
              <Utilities />
            </motion.div>

            <motion.button
              className="flex shrink-0 items-center gap-1.5 sm:gap-2 rounded-full p-1.5 sm:pr-3 text-xs sm:text-sm font-medium text-gray-600 bg-gray-50 hover:text-[#7F1D1D] hover:bg-gray-100 transition-colors"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.25, ease: 'easeOut' }}
              whileHover={{ y: -1 }}
              type="button"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7F1D1D] text-white">
                <LogIn className="h-5 w-5" />
              </span>
              <span className="hidden sm:inline">{t('signInOrSignUp')}</span>
            </motion.button>

            <motion.div
              className="shrink-0"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.25, ease: 'easeOut' }}
            >
              <LangSwitch />
            </motion.div>
          </div>
        </div>

        {/* Second row: full-width search bar */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.25, ease: 'easeOut' }}
        >
          <SearchBar />
        </motion.div>
      </div>

      {/* Desktop: Single-row layout (original design) */}
      <div className="hidden lg:flex items-center gap-4 md:gap-6">
        <motion.div
          className="shrink-0"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0.25, ease: 'easeOut' }}
        >
          <Image
            src={logo}
            alt="..."
            priority
            quality={100}
            className="h-auto w-32 object-contain"
          />
        </motion.div>

        <motion.div
          className="flex-1 min-w-0"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.25, ease: 'easeOut' }}
        >
          <SearchBar />
        </motion.div>

        <motion.div
          className="shrink-0"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.25, ease: 'easeOut' }}
        >
          <Utilities />
        </motion.div>

        <motion.button
          className="flex shrink-0 items-center gap-2 rounded-full p-1.5 pr-3 text-sm font-medium text-gray-600 bg-gray-50 hover:text-[#7F1D1D] hover:bg-gray-100 transition-colors"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.25, ease: 'easeOut' }}
          whileHover={{ y: -1 }}
          type="button"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7F1D1D] text-white">
            <LogIn className="h-5 w-5" />
          </span>
          <span>{t('signInOrSignUp')}</span>
        </motion.button>

        <motion.div
          className="shrink-0"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.25, ease: 'easeOut' }}
        >
          <LangSwitch />
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
