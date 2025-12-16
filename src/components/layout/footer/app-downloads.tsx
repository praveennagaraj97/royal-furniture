'use client';

import { motion, type Variants } from 'framer-motion';
import { FC } from 'react';

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

const AppDownloads: FC = () => {
  return (
    <motion.div className="flex flex-col gap-3" variants={itemVariants}>
      <p className="text-gray-700 text-sm font-medium">Download our app on</p>
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Google Play Placeholder */}
        <button
          type="button"
          className="flex items-center gap-2 bg-black text-white px-4 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
        >
          <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
            <span className="text-xs">GP</span>
          </div>
          <span className="text-sm">GET IT ON Google Play</span>
        </button>
        {/* App Store Placeholder */}
        <button
          type="button"
          className="flex items-center gap-2 bg-black text-white px-4 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
        >
          <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
            <span className="text-xs">AS</span>
          </div>
          <span className="text-sm">Download on the App Store</span>
        </button>
      </div>
    </motion.div>
  );
};

export default AppDownloads;
