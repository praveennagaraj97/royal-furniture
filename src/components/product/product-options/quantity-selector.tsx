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
    <ViewOnce type="slideUp" distance={15} duration={0.4} delay={0.1} amount={0.01} margin="-100px">
      <div>
        <span className="text-base font-semibold text-gray-900">Quantity:</span>
        <div className="flex gap-3 items-center mt-3">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => onQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-10 h-10 rounded-full border border-deep-maroon flex items-center justify-center text-deep-maroon hover:bg-deep-maroon hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              aria-label="Decrease quantity"
            >
              <FiMinus className="w-4 h-4" />
            </button>
            <span className="px-2 py-2 text-2xl font-bold min-w-12 text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => onQuantityChange(1)}
              disabled={stockCount ? quantity >= stockCount : false}
              className="w-10 h-10 rounded-full border border-deep-maroon flex items-center justify-center text-deep-maroon hover:bg-deep-maroon hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              aria-label="Increase quantity"
            >
              <FiPlus className="w-4 h-4" />
            </button>
          </div>
          <span className="text-green-600 font-medium text-sm">In Stock</span>
        </div>
      </div>
    </ViewOnce>
  );
};
