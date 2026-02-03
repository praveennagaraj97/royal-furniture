'use client';

import { StaggerContainer, ViewOnce } from '@/components/shared/animations';
import Portal from '@/components/shared/portal';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState, type ReactNode } from 'react';
import { FiChevronRight, FiMenu, FiX } from 'react-icons/fi';
import AccountManagement from './account-management';
import FeedbackInfoSection from './feedback-info-section';
import SettingsSection from './settings-section';
import UserProfileHeader from './user-profile-header';

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout: FC<UserLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="section-container pb-2">
      {/* Mobile Toggle Button */}
      <ViewOnce
        type="slideDown"
        distance={10}
        duration={0.4}
        margin="-50px"
        className="lg:hidden mb-6"
      >
        <motion.button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-sm shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 group"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-deep-maroon/10 rounded-sm group-hover:bg-deep-maroon/20 transition-colors">
              <FiMenu className="h-5 w-5 text-deep-maroon" />
            </div>
            <span className="text-base font-semibold text-gray-900">Menu</span>
          </div>
          <FiChevronRight className="h-5 w-5 text-gray-400 group-hover:text-deep-maroon transition-colors" />
        </motion.button>
      </ViewOnce>

      <StaggerContainer
        staggerChildren={0.1}
        delayChildren={0.1}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
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
                        <FiX className="h-5 w-5 text-gray-600" />
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
      </StaggerContainer>
    </div>
  );
};

export default UserLayout;
