'use client';

import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { FC, useState } from 'react';

import AuthModal from '@/components/auth/auth-modal';
import Image from 'next/image';
import { AuthActionButton } from './auth-action-button';
import LangSwitch from './lang-switch';
import MobileMenu from './mobile-menu';
import SearchBar from './search';
import Utilities from './utilities';

import logo from '@/assets/logo.png';

const Header: FC = () => {
  const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="container mx-auto px-3 py-2.5 md:py-3">
      {/* Mobile/Tablet: Two-row layout */}
      <div className="flex flex-col gap-2 lg:hidden">
        {/* Top row: logo + hamburger */}
        <div className="flex items-center justify-between gap-2 sm:gap-3">
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
              className="h-auto"
            />
          </motion.div>

          <motion.button
            className="shrink-0 p-2 rounded-full hover:bg-gray-100 transition-colors"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.25, ease: 'easeOut' }}
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </motion.button>
        </div>

        {/* Second row: full-width search bar */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.25, ease: 'easeOut' }}
        >
          <SearchBar />
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onSignIn={() => setIsSignupFormOpen(true)}
      />

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

        <AuthActionButton onClick={() => setIsSignupFormOpen(true)} />

        <motion.div
          className="shrink-0"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.25, ease: 'easeOut' }}
        >
          <LangSwitch />
        </motion.div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isSignupFormOpen}
        onClose={() => setIsSignupFormOpen(false)}
      />
    </header>
  );
};

export default Header;
