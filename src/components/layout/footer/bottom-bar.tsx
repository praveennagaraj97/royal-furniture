'use client';

import { motion, type Variants } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';
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

const BottomBar: FC = () => {
  return (
    <motion.div
      className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3"
      variants={itemVariants}
    >
      <p className="text-gray-700 text-sm">
        © 2025 Furniture Store. All rights reserved.
      </p>
      <div className="flex items-center gap-4">
        {/* Region Selector */}
        <button
          type="button"
          className="flex items-center gap-2 text-gray-700 text-sm hover:text-deep-maroon transition-colors duration-200"
        >
          <span className="text-lg">🇦🇪</span>
          <span>United Arab Emirates</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        {/* Language Selector */}
        <button
          type="button"
          className="flex items-center gap-2 text-gray-700 text-sm hover:text-deep-maroon transition-colors duration-200"
        >
          <Globe className="w-4 h-4" />
          <span>ENG</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default BottomBar;
