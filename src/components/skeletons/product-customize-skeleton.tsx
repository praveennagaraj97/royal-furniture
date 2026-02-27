'use client';

import { motion } from 'framer-motion';
import { FC } from 'react';

const ProductCustomizeSkeleton: FC = () => {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <div className="h-5 w-40 bg-gray-100 rounded animate-pulse" />

      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="relative flex gap-3 p-3 sm:p-4 rounded-2xl border bg-white shadow-sm transition-all duration-200"
          >
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden bg-gray-100 shrink-0 animate-pulse" />

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div className="w-full">
                  <div className="h-4 w-36 bg-gray-100 rounded animate-pulse" />
                  <div className="mt-2 h-3 w-24 bg-gray-100 rounded animate-pulse" />
                </div>

                <div className="mt-1 inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-gray-200">
                  <div className="w-2.5 h-2.5 rounded-full bg-transparent" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {Array.from({ length: 5 }).map((_, sIdx) => (
                  <div
                    key={sIdx}
                    className="w-7 h-7 rounded-full bg-gray-100 animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProductCustomizeSkeleton;
