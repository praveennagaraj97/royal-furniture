'use client';

import { useTranslations } from 'next-intl';
import type { FC } from 'react';
import { IoMdCart } from 'react-icons/io';

interface AddToCartSuccessFooterProps {
  onContinue: () => void;
  onGoToCart?: () => void;
}

export const AddToCartSuccessFooter: FC<AddToCartSuccessFooterProps> = ({
  onContinue,
  onGoToCart,
}) => {
  const t = useTranslations('checkout.cart.added');
  const handleGoToCart = () => {
    if (onGoToCart) {
      onGoToCart();
    }
  };

  return (
    <div
      className="border-t border-gray-200 bg-white px-4 sm:px-6 pt-3 sm:pt-4 pb-3"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)' }}
    >
      <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center">
        <div className="flex-1 flex justify-center md:justify-start">
          <div className="w-full max-w-md flex items-center justify-center gap-3 rounded-xl bg-[#fff4f1] px-3 py-2">
            <div className="p-px rounded-full border border-deep-maroon">
              <div className="flex items-center justify-center p-2 rounded-full bg-deep-maroon text-white">
                <IoMdCart className="w-4 h-4" />
              </div>
            </div>
            <p className="text-sm font-semibold text-deep-maroon">
              {t('success')}
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2 w-full md:flex-row md:w-auto md:ml-auto">
          <button
            type="button"
            onClick={onContinue}
            className="w-full md:w-auto px-4 py-2.5 text-sm font-semibold text-deep-maroon bg-white border border-deep-maroon rounded-lg hover:bg-[#FFF4F4] transition-colors duration-200"
          >
            {t('continue')}
          </button>
          <button
            type="button"
            onClick={handleGoToCart}
            className="w-full md:w-auto px-4 py-2.5 text-sm font-semibold text-white bg-deep-maroon rounded-lg hover:bg-[#6b0000] transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            {t('goToCart')}
          </button>
        </div>
      </div>
    </div>
  );
};
