'use client';

import type { FC } from 'react';
import { FiShoppingCart } from 'react-icons/fi';

interface AddToCartSuccessFooterProps {
  onContinue: () => void;
  onGoToCart?: () => void;
}

export const AddToCartSuccessFooter: FC<AddToCartSuccessFooterProps> = ({
  onContinue,
  onGoToCart,
}) => {
  const handleGoToCart = () => {
    if (onGoToCart) {
      onGoToCart();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-[#fff4f1] px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-deep-maroon/10 text-deep-maroon">
            <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <p className="text-sm sm:text-base font-medium text-deep-maroon">
            Successfully added to your cart
          </p>
        </div>

        <div className="flex flex-col-reverse gap-2 w-full md:flex-row md:w-auto md:ml-auto">
          <button
            type="button"
            onClick={onContinue}
            className="w-full md:w-auto px-4 py-2.5 text-sm font-semibold text-deep-maroon bg-white border border-deep-maroon rounded-lg hover:bg-deep-maroon/5 transition-colors duration-200"
          >
            Continue Shopping
          </button>
          <button
            type="button"
            onClick={handleGoToCart}
            className="w-full md:w-auto px-4 py-2.5 text-sm font-semibold text-white bg-deep-maroon rounded-lg hover:bg-[#6b0000] transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Go to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
