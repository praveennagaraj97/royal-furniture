'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
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
  return (
    <div className="container mx-auto px-3 py-4">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Left Column - User Layout */}
        <div className="lg:col-span-1 space-y-6">
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
export { AccountManagement, FeedbackInfoSection, SettingsSection, UserProfileHeader };
