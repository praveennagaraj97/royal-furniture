'use client';

import { ViewOnce } from '@/components/shared/animations';
import { useTranslations } from 'next-intl';
import { FiShoppingCart } from 'react-icons/fi';

export interface ProductActionsProps {
  onAddToCart?: () => void;
  onBuyNow?: () => void;
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  onAddToCart,
  onBuyNow,
}) => {
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      <ViewOnce
        type="slideUp"
        distance={20}
        duration={0.4}
        delay={0.1}
        amount={0.01}
        margin="-100px"
        className="grow"
      >
        <button
          type="button"
          onClick={onAddToCart}
          className="whitespace-nowrap flex items-center justify-center w-full gap-2 bg-deep-maroon text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base hover:bg-[#6b0000] transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>{t('common.addToCart')}</span>
        </button>
      </ViewOnce>
      <ViewOnce
        type="slideUp"
        distance={20}
        duration={0.4}
        delay={0.15}
        amount={0.01}
        margin="-100px"
      >
        <button
          type="button"
          onClick={onBuyNow}
          className="whitespace-nowrap w-full border border-deep-maroon text-deep-maroon py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base hover:bg-deep-maroon hover:text-white transition-all duration-200"
        >
          Buy Now
        </button>
      </ViewOnce>
    </div>
  );
};
