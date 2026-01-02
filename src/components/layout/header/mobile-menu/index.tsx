'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { FC, useRef, useState } from 'react';

import { AuthSection } from './auth-section';
import { CategoriesSection } from './categories-section';
import { MobileMenuHeader } from './header';
import { QuickLinksSection } from './quick-links-section';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose, onSignIn }) => {
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const isRTL = locale === 'ar';

  const itemVariants = {
    hidden: { opacity: 0, x: isRTL ? 20 : -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: isRTL ? 20 : -20 },
  };

  // Animation values based on RTL
  const menuInitialX = isRTL ? '100%' : '-100%';
  const menuExitX = isRTL ? '100%' : '-100%';

  const showMainContent = !selectedCategory;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Menu Panel - Full width and height, slides from left to right (or right to left for RTL) */}
          <motion.div
            ref={menuRef}
            className="fixed top-0 left-0 right-0 w-full h-screen bg-white z-50 lg:hidden shadow-lg flex flex-col"
            style={{
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
            initial={{ x: menuInitialX }}
            animate={{ x: 0 }}
            exit={{ x: menuExitX }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Header */}
            <MobileMenuHeader onClose={onClose} />

            {/* Content Area - Scrollable */}
            <div className="flex-1 overflow-y-auto px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              {/* Sign Up / Sign In Buttons */}
              <AuthSection
                onSignIn={onSignIn}
                onClose={onClose}
                isVisible={showMainContent}
                containerVariants={containerVariants}
              />

              {/* HR Line */}
              {showMainContent && <hr className="mb-4 border-gray-200" />}

              {/* Categories List */}
              <CategoriesSection
                selectedCategory={selectedCategory}
                onCategoryClick={handleCategoryClick}
                onBackClick={handleBackClick}
                onClose={onClose}
              />

              {/* HR Line */}
              {showMainContent && <hr className="mb-4 border-gray-200" />}

              {/* Quick Links */}
              <QuickLinksSection
                isVisible={showMainContent}
                containerVariants={containerVariants}
                itemVariants={itemVariants}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
