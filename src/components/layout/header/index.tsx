'use client';

import { SlideIn } from '@/components/shared/animations';
import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef, useState } from 'react';
import { FiHeart, FiMenu, FiShoppingCart, FiX } from 'react-icons/fi';

import AuthModal from '@/components/auth/auth-modal';
import { AppLink, useAppPathName } from '@/hooks';
import Image from 'next/image';
import { AuthActionButton } from './auth-action-button';
import LangSwitch from './lang-switch';
import MobileMenu from './mobile-menu';
import SearchBar from './search';
import Utilities from './utilities';

import logo from '@/assets/logo.png';

interface HeaderProps {
  isSticky?: boolean;
}

const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ isSticky = false }, ref) => {
    const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathName = useAppPathName();
    const isHome = pathName === '/';

    return (
      <motion.header
        ref={ref}
        className={`${
          isSticky
            ? 'fixed top-0 left-0 right-0 z-50 bg-white rounded-b-2xl shadow-2xl'
            : 'relative z-50 bg-white'
        } transition-shadow duration-300 ease-out`}
      >
        <div className="relative section-container py-2.5 md:py-3 z-50">
          {/* Mobile/Tablet: Two-row layout */}
          <div className="flex flex-col gap-2 lg:hidden">
            {/* Top row: hamburger + logo (left) + heart/cart (right) */}
            <div
              className="relative flex items-center justify-between gap-2 sm:gap-3"
              data-hamburger-row
            >
              <SlideIn
                direction="down"
                distance={4}
                duration={0.25}
                delay={0}
                triggerOnView={false}
                className="flex items-center space-x-2"
              >
                <motion.button
                  className="shrink-0 p-2 rounded-full hover:bg-gray-100 transition-colors relative"
                  type="button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiX className="h-6 w-6 text-gray-600" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiMenu className="h-6 w-6 text-gray-600" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                <AppLink href="/">
                  <Image
                    src={logo}
                    alt="..."
                    priority
                    quality={100}
                    className="h-8 w-auto sm:h-10 object-contain"
                  />
                </AppLink>
              </SlideIn>

              <SlideIn
                direction="down"
                distance={4}
                duration={0.25}
                delay={0.1}
                triggerOnView={false}
                className="shrink-0 flex items-center gap-2 sm:gap-3"
              >
                <button className="relative rounded-full text-black hover:text-[#7F1D1D] transition-colors p-2">
                  <FiHeart className="h-6 w-6" />
                </button>
                <button className="relative rounded-full text-black hover:text-[#7F1D1D] transition-colors p-2">
                  <FiShoppingCart className="h-6 w-6" />
                </button>
              </SlideIn>

              {/* Mobile Menu - positioned below this row */}
              <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                onSignIn={() => setIsSignupFormOpen(true)}
              />
            </div>

            {/* Second row: full-width search bar (home only on mobile) */}
            {isHome && (
              <SlideIn
                direction="down"
                distance={4}
                duration={0.25}
                delay={0.1}
                triggerOnView={false}
              >
                <SearchBar />
              </SlideIn>
            )}
          </div>

          {/* Desktop: Single-row layout (original design) */}
          <div className="hidden lg:flex items-center gap-4 md:gap-6">
            <SlideIn
              direction="down"
              distance={4}
              duration={0.25}
              delay={0}
              triggerOnView={false}
              className="shrink-0"
            >
              <AppLink href="/">
                <Image
                  src={logo}
                  alt="..."
                  priority
                  quality={100}
                  className="h-auto w-32 object-contain"
                />
              </AppLink>
            </SlideIn>

            <SlideIn
              direction="down"
              distance={4}
              duration={0.25}
              delay={0.05}
              triggerOnView={false}
              className="flex-1 min-w-0"
            >
              <SearchBar />
            </SlideIn>

            <SlideIn
              direction="down"
              distance={4}
              duration={0.25}
              delay={0.1}
              triggerOnView={false}
              className="shrink-0"
            >
              <Utilities />
            </SlideIn>

            <AuthActionButton onClick={() => setIsSignupFormOpen(true)} />

            <SlideIn
              direction="down"
              distance={4}
              duration={0.25}
              delay={0.2}
              triggerOnView={false}
              className="shrink-0"
            >
              <LangSwitch />
            </SlideIn>
          </div>

          {/* Auth Modal */}
          <AuthModal
            isOpen={isSignupFormOpen}
            onClose={() => setIsSignupFormOpen(false)}
          />
        </div>
      </motion.header>
    );
  },
);

Header.displayName = 'Header';

export default Header;
