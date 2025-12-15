'use client';

import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { FC } from 'react';
import Logo from '../../shared/icon';
import LangSwitch from './lang-switch';
import SearchBar from './search';
import Utilities from './utilities';

const Header: FC = () => {
  return (
    <header className="container mx-auto py-3 flex items-center space-x-6">
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0, duration: 0.25, ease: 'easeOut' }}
      >
        <Logo className="h-10" />
      </motion.div>

      <motion.div
        className="flex-1"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.25, ease: 'easeOut' }}
      >
        <SearchBar />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.25, ease: 'easeOut' }}
      >
        <Utilities />
      </motion.div>

      <motion.button
        className="flex items-center gap-2 rounded-full p-1.5 pr-3 text-sm font-medium text-gray-600 hover:text-[#7F1D1D] hover:bg-gray-100 transition-colors"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.25, ease: 'easeOut' }}
        whileHover={{ y: -1 }}
        type="button"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7F1D1D] text-white">
          <LogIn className="h-4 w-4" />
        </span>
        <span className="hidden md:inline">Sign in or sign up</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.25, ease: 'easeOut' }}
      >
        <LangSwitch />
      </motion.div>
    </header>
  );
};

export default Header;
