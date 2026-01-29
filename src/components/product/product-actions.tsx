'use client';

import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { startTransition, useEffect, useRef, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import AddToCartWrapper from '../shared/ui/add-to-cart-modal';

export interface ProductActionsProps {
  onAddToCart?: () => void;
  onBuyNow?: () => void;
}

export const ProductActions: React.FC<ProductActionsProps> = ({ onBuyNow }) => {
  const t = useTranslations();
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const isVisible = useIntersectionObserver({ ref: actionsRef });

  useEffect(() => {
    startTransition(() => {
      setHasMounted(true);
    });
  }, []);

  return (
    <>
      <div ref={actionsRef} className="flex flex-col gap-2 sm:gap-3">
        <AddToCartWrapper>
          <button
            type="button"
            className="whitespace-nowrap flex items-center justify-center w-full gap-2 bg-deep-maroon text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base hover:bg-[#6b0000] transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{t('common.addToCart')}</span>
          </button>
        </AddToCartWrapper>
        <button
          type="button"
          onClick={onBuyNow}
          className="whitespace-nowrap w-full border border-deep-maroon text-deep-maroon py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base hover:bg-deep-maroon hover:text-white transition-all duration-200"
        >
          Buy Now
        </button>
      </div>

      <AnimatePresence>
        {hasMounted && !isVisible && (
          <motion.div
            key="sticky-actions"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-x-0 bottom-0 z-40 bg-white border-t border-gray-200 px-3 sm:px-4 py-2.5 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]"
          >
            <div className="max-w-6xl mx-auto flex items-center gap-2 sm:gap-3">
              <div className="flex-1">
                <AddToCartWrapper>
                  <button
                    type="button"
                    className="whitespace-nowrap flex items-center justify-center w-full gap-2 bg-deep-maroon text-white py-2.5 px-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-[#6b0000] transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{t('common.addToCart')}</span>
                  </button>
                </AddToCartWrapper>
              </div>
              <button
                type="button"
                onClick={onBuyNow}
                className="whitespace-nowrap flex-1 border border-deep-maroon text-deep-maroon py-2.5 px-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-deep-maroon hover:text-white transition-all duration-200"
              >
                Buy Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
