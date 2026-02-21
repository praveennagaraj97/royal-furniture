'use client';

import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import type { ProductDetailData, ResponsiveImages } from '@/types/response';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FC, startTransition, useEffect, useRef, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';
import AddToCartWrapper from '../shared/ui/add-to-cart';

export interface ProductActionsProps {
  product: ProductDetailData;
  mainVariantImage?: ResponsiveImages;
  onAddToCart?: () => void;
  onBuyNow?: () => void;
  isInCart?: boolean;
  onGoToCart?: () => void;
  isAdding?: boolean;
  isOutOfStock?: boolean;
}

export const ProductActions: FC<ProductActionsProps> = ({
  product,
  mainVariantImage,
  onAddToCart,
  onBuyNow,
  isInCart = false,
  onGoToCart,
  isAdding = false,
  isOutOfStock = false,
}) => {
  const tCommon = useTranslations('common');
  const tActions = useTranslations('product.actions');
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
        {isInCart ? (
          <button
            type="button"
            onClick={onGoToCart}
            className="whitespace-nowrap flex items-center justify-center w-full gap-2 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base bg-emerald-50 text-emerald-700 border border-emerald-200"
          >
            <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" />
            <span className="font-semibold">{tCommon('inCart')}</span>
          </button>
        ) : (
          <AddToCartWrapper
            product={product}
            mainVariantImage={mainVariantImage}
            onOpen={onAddToCart}
            onGoToCart={onGoToCart}
          >
            <button
              type="button"
              className={`whitespace-nowrap flex items-center justify-center w-full gap-2 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-200 bg-deep-maroon text-white hover:bg-[#6b0000] shadow-md hover:shadow-lg`}
              disabled={isOutOfStock}
            >
              {isAdding ? (
                <ImSpinner2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
              <span>
                {isOutOfStock ? tActions('outOfStock') : tCommon('addToCart')}
              </span>
            </button>
          </AddToCartWrapper>
        )}
        <button
          type="button"
          onClick={onBuyNow}
          disabled={isOutOfStock}
          className="whitespace-nowrap w-full border border-deep-maroon text-deep-maroon py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base hover:bg-deep-maroon hover:text-white transition-all duration-200"
        >
          {isOutOfStock ? tActions('outOfStock') : tActions('buyNow')}
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
                <AddToCartWrapper
                  product={product}
                  mainVariantImage={mainVariantImage}
                  onOpen={onAddToCart}
                  onGoToCart={onGoToCart}
                >
                  <button
                    type="button"
                    className={`whitespace-nowrap flex items-center justify-center w-full gap-2 py-2.5 px-4 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-200 ${
                      isInCart
                        ? 'bg-white text-deep-maroon border border-deep-maroon hover:bg-[#FFF4F4]'
                        : 'bg-deep-maroon text-white hover:bg-[#6b0000] shadow-md hover:shadow-lg'
                    }`}
                    disabled={isOutOfStock && !isInCart}
                  >
                    {isAdding ? (
                      <ImSpinner2 className="w-4 h-4 animate-spin text-white" />
                    ) : (
                      <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                    <span>
                      {isOutOfStock
                        ? tActions('outOfStock')
                        : isInCart
                          ? tCommon('inCart')
                          : tCommon('addToCart')}
                    </span>
                  </button>
                </AddToCartWrapper>
              </div>
              <button
                type="button"
                onClick={onBuyNow}
                disabled={isOutOfStock}
                className="whitespace-nowrap flex-1 border border-deep-maroon text-deep-maroon py-2.5 px-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-deep-maroon hover:text-white transition-all duration-200"
              >
                {isOutOfStock ? tActions('outOfStock') : tActions('buyNow')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
