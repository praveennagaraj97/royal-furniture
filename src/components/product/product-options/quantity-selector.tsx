'use client';

import { ViewOnce } from '@/components/shared/animations';
import { FiMinus, FiPlus } from 'react-icons/fi';

export interface QuantitySelectorProps {
  quantity: number;
  stockCount?: number;
  onQuantityChange: (delta: number) => void;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  stockCount,
  onQuantityChange,
}) => {
  return (
    <ViewOnce
      type="slideUp"
      distance={15}
      duration={0.4}
      delay={0.1}
      amount={0.01}
      margin="-40px"
    >
      <div>
        <span className="text-sm md:text-base font-semibold text-gray-900">
          Quantity:
        </span>
        <div className="flex gap-3 items-center mt-3">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => onQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-deep-maroon flex items-center justify-center text-deep-maroon hover:bg-deep-maroon hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              aria-label="Decrease quantity"
            >
              <FiMinus className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <span className="px-2 py-2 text-lg sm:text-xl md:text-2xl font-bold min-w-10 sm:min-w-12 text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => onQuantityChange(1)}
              disabled={stockCount ? quantity >= stockCount : false}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-deep-maroon flex items-center justify-center text-deep-maroon hover:bg-deep-maroon hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              aria-label="Increase quantity"
            >
              <FiPlus className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
          <span className="text-green-600 font-medium text-xs md:text-sm">
            In Stock
          </span>
        </div>
      </div>
    </ViewOnce>
  );
};
