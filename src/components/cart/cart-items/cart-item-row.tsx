'use client';

import ResponsiveImage from '@/components/shared/ui/responsive-image';
import type { CartItem } from '@/types/cart';
import { FC } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

interface CartItemRowProps {
  item: CartItem;
  currency: string;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export const CartItemRow: FC<CartItemRowProps> = ({
  item,
  currency,
  onQuantityChange,
  onRemove,
}) => {
  const itemTotal = item.price * item.quantity;
  const hasSavings = item.basePrice && item.basePrice > item.price;

  return (
    <div className="flex flex-col gap-4 border-b border-gray-200 pb-4 last:border-none last:pb-0">
      <div className="flex flex-col sm:grid sm:grid-cols-[1.5fr_1fr_1fr_1fr] sm:items-center gap-4">
        {/* Product details */}
        <div className="flex items-start gap-3">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gray-100">
            <ResponsiveImage
              images={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
              shouldFill
            />
          </div>
          <div className="flex flex-col gap-1 text-sm text-gray-700">
            <span className="text-base font-medium text-gray-900 line-clamp-1">
              {item.name}
            </span>
            {item.attributes?.map((attribute) => (
              <span key={`${item.id}-${attribute}`} className="text-gray-500">
                {attribute}
              </span>
            ))}
            <button
              type="button"
              className="text-xs font-semibold text-deep-maroon hover:text-[#6b0000] transition-colors duration-200"
              onClick={onRemove}
            >
              Remove
            </button>
          </div>
        </div>

        {/* Price */}
        <div className="text-sm sm:text-base text-gray-900 font-semibold">
          <div className="flex items-center gap-2">
            <span>
              {currency}
              {item.price.toFixed(0)}
            </span>
            {hasSavings && (
              <span className="text-xs text-gray-400 line-through">
                {currency}
                {item.basePrice?.toFixed(0)}
              </span>
            )}
          </div>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onQuantityChange(item.quantity - 1)}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            <FiMinus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-semibold text-gray-900">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => onQuantityChange(item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            <FiPlus className="w-4 h-4" />
          </button>
        </div>

        {/* Total */}
        <div className="text-sm sm:text-base font-semibold text-gray-900">
          {currency}
          {itemTotal.toFixed(0)}
        </div>
      </div>
    </div>
  );
};
