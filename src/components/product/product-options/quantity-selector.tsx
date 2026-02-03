'use client';

import { ViewOnce } from '@/components/shared/animations';
import { FC } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
} from 'react-icons/io';

export interface QuantitySelectorProps {
  quantity: number;
  stockCount?: number;
  onQuantityChange: (delta: number) => void;
}

export const QuantitySelector: FC<QuantitySelectorProps> = ({
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
        <span className="text-sm md:text-base font-medium text-gray-900">
          Quantity:
        </span>
        <div className="flex gap-3 items-center mt-3">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => onQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-full border border-deep-maroon flex items-center justify-center text-deep-maroon hover:bg-deep-maroon hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              aria-label="Decrease quantity"
            >
              <FiMinus className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <span className="px-2 py-2 text-xl font-bold min-w-8 sm:min-w-10 text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => onQuantityChange(1)}
              disabled={stockCount ? quantity >= stockCount : false}
              className="w-8 h-8 rounded-full border border-deep-maroon flex items-center justify-center text-deep-maroon hover:bg-deep-maroon hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              aria-label="Increase quantity"
            >
              <FiPlus className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
          {typeof stockCount === 'number' && stockCount <= 0 ? (
            <span className="text-red-600 font-medium text-xs md:text-sm flex items-center gap-1">
              <IoIosCloseCircleOutline className="inline-block text-2xl text-red-600" />
              Out of Stock
            </span>
          ) : (
            <span className="text-green-600 font-medium text-xs md:text-sm flex items-center gap-1">
              <IoIosCheckmarkCircleOutline className="inline-block text-2xl text-green-600" />
              In Stock
            </span>
          )}
        </div>
      </div>
    </ViewOnce>
  );
};
