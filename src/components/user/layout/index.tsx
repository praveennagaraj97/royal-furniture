'use client';

import Portal from '@/components/shared/portal';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import AccountManagement from './account-management';
import FeedbackInfoSection from './feedback-info-section';
import SettingsSection from './settings-section';
import UserProfileHeader from './user-profile-header';

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

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="container mx-auto px-3 py-4">
      {/* Mobile Toggle Button */}
      <button
        type="button"
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden mb-4 inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-sm shadow-sm hover:bg-gray-50 hover:text-deep-maroon transition-colors"
      >
        <Menu className="h-4 w-4" />
        <span>Menu</span>
      </button>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Mobile Sidebar with Portal */}
        <Portal>
          <AnimatePresence>
            {isSidebarOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  className="fixed inset-0 bg-black/30 z-40 lg:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsSidebarOpen(false)}
                />

                {/* Sidebar Panel */}
                <motion.div
                  className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 lg:hidden shadow-xl overflow-y-auto"
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <div className="p-4">
                    {/* Close Button */}
                    <div className="flex justify-end mb-4">
                      <button
                        type="button"
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <X className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>

                    {/* Sidebar Content */}
                    <div className="space-y-6">
                      <UserProfileHeader />
                      <SettingsSection />
                      <FeedbackInfoSection />
                      <AccountManagement />
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </Portal>

        {/* Desktop Sidebar - Always Visible */}
        <div className="hidden lg:block lg:col-span-1 space-y-6">
          <UserProfileHeader />
          <SettingsSection />
          <FeedbackInfoSection />
          <AccountManagement />
        </div>

        {/* Right Column - Page Content */}
        <div className="lg:col-span-2">{children}</div>
      </motion.div>
    </div>
  );
};

export default UserLayout;
