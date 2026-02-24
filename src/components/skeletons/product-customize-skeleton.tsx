'use client';

import { motion } from 'framer-motion';
import { FC } from 'react';

const ProductCustomizeSkeleton: FC = () => {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <div className="h-5 w-32 bg-gray-100 rounded animate-pulse" />
      <div className="flex gap-3 flex-wrap">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="w-28 h-20 rounded-lg bg-gray-100 animate-pulse"
          />
        ))}
      </div>
      <div className="h-5 w-24 bg-gray-100 rounded animate-pulse" />
      <div className="flex gap-3 flex-wrap">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="w-9 h-9 rounded-full bg-gray-100 animate-pulse"
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ProductCustomizeSkeleton;
