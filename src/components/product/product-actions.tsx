'use client';

import { useToast } from '@/contexts/toast-context';
import { useStickyVisibility } from '@/hooks/use-sticky-visibility';
import type { ProductDetailData, ResponsiveImages } from '@/types/response';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  FC,
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FiBell, FiShoppingCart } from 'react-icons/fi';
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
  const { showSuccess } = useToast();
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const isVisible = useStickyVisibility(actionsRef);

  const handleNotify = useCallback(() => {
    showSuccess(tActions('notifyConfirmation'));
  }, [showSuccess, tActions]);

  const notifyButtonStyles =
    'whitespace-nowrap flex items-center justify-center w-full gap-2 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-200 border border-amber-200 text-amber-900 bg-amber-50 hover:bg-amber-100';

  useEffect(() => {
    startTransition(() => {
      setHasMounted(true);
    });
  }, []);

  return (
    <>
      <div ref={actionsRef} className="flex flex-col gap-2 sm:gap-3">
        {isOutOfStock ? (
          <button
            type="button"
            onClick={handleNotify}
            className={notifyButtonStyles}
          >
            <FiBell className="w-4 h-4 text-amber-600" />
            <span>{tActions('notifyMe')}</span>
          </button>
        ) : (
          <>
            <AddToCartWrapper
              product={product}
              mainVariantImage={mainVariantImage}
              onOpen={onAddToCart}
              onGoToCart={onGoToCart}
              disableOpen={isInCart}
            >
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
                <button
                  type="button"
                  className={`whitespace-nowrap flex items-center justify-center w-full gap-2 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-200 bg-deep-maroon text-white hover:bg-[#6b0000] shadow-md hover:shadow-lg`}
                >
                  {isAdding ? (
                    <ImSpinner2 className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                  <span>{tCommon('addToCart')}</span>
                </button>
              )}
            </AddToCartWrapper>
            <button
              type="button"
              onClick={onBuyNow}
              className="whitespace-nowrap w-full border border-deep-maroon text-deep-maroon py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base hover:bg-deep-maroon hover:text-white transition-all duration-200"
            >
              {tActions('buyNow')}
            </button>
          </>
        )}
      </div>

      <AnimatePresence>
        {hasMounted && !isVisible && !isOutOfStock && (
          <motion.div
            key="sticky-actions"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-x-0 bottom-0 z-40 m-0! bg-white border-t border-gray-200 px-3 sm:px-4 py-2.5 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]"
          >
            <div className="max-w-6xl mx-auto flex items-center gap-2 sm:gap-3">
              <div className="flex-1">
                {isOutOfStock ? (
                  <button
                    type="button"
                    onClick={handleNotify}
                    className={notifyButtonStyles}
                  >
                    <FiBell className="w-4 h-4 text-amber-600" />
                    <span>{tActions('notifyMe')}</span>
                  </button>
                ) : (
                  <AddToCartWrapper
                    product={product}
                    mainVariantImage={mainVariantImage}
                    onOpen={onAddToCart}
                    onGoToCart={onGoToCart}
                    disableOpen={isInCart}
                  >
                    {isInCart ? (
                      <button
                        type="button"
                        onClick={onGoToCart}
                        className={`whitespace-nowrap flex items-center justify-center w-full gap-2 py-2.5 px-4 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-200 bg-white text-deep-maroon border border-deep-maroon hover:bg-[#FFF4F4]`}
                      >
                        <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" />
                        <span className="font-semibold">
                          {tCommon('inCart')}
                        </span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={`whitespace-nowrap flex items-center justify-center w-full gap-2 py-2.5 px-4 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-200 bg-deep-maroon text-white hover:bg-[#6b0000] shadow-md hover:shadow-lg`}
                      >
                        {isAdding ? (
                          <ImSpinner2 className="w-4 h-4 animate-spin text-white" />
                        ) : (
                          <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                        <span>{tCommon('addToCart')}</span>
                      </button>
                    )}
                  </AddToCartWrapper>
                )}
              </div>
              {isOutOfStock ? (
                <button
                  type="button"
                  onClick={handleNotify}
                  className={`${notifyButtonStyles} flex-1`}
                >
                  <FiBell className="w-4 h-4 text-amber-600" />
                  <span>{tActions('notifyMe')}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onBuyNow}
                  className="whitespace-nowrap flex-1 border border-deep-maroon text-deep-maroon py-2.5 px-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-deep-maroon hover:text-white transition-all duration-200"
                >
                  {tActions('buyNow')}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
