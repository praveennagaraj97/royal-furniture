'use client';

import ResponsiveImage from '@/components/shared/ui/responsive-image';
import type { CartItem } from '@/types/cart';
import { FC } from 'react';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';

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
    <div className="border-b border-gray-200 pb-4 last:border-none last:pb-0">
      {/* Mobile layout: [image][content][qty/total] */}
      <div className="flex gap-3 sm:hidden">
        {/* Image */}
        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0">
          <ResponsiveImage
            images={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
            shouldFill
          />
        </div>

        {/* Content + right column */}
        <div className="flex-1 flex items-stretch gap-3 text-sm text-gray-700">
          {/* Middle: title, attributes, price */}
          <div className="flex-1 space-y-1">
            <span className="text-base font-medium text-gray-900">
              {item.name}
            </span>
            {item.attributes?.map((attribute, index) => (
              <span
                key={`${item.id}-${attribute}`}
                className={
                  index === 0 || attribute.toLowerCase().startsWith('save')
                    ? 'block text-xs font-semibold text-[#007B35]'
                    : 'block text-xs text-gray-500'
                }
              >
                {attribute}
              </span>
            ))}
            <div className="mt-1 flex items-center gap-2">
              {hasSavings && (
                <span className="text-xs text-gray-400 line-through">
                  {currency}
                  {item.basePrice?.toFixed(0)}
                </span>
              )}
              <span className="text-[#e00000] font-semibold">
                {currency}
                {item.price.toFixed(0)}
              </span>
            </div>
          </div>

          {/* Right: qty on top, total + remove at bottom */}
          <div className="flex flex-col items-end justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onQuantityChange(item.quantity - 1)}
                className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                <FiMinus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-semibold">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => onQuantityChange(item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-sm font-semibold text-gray-900">
                {currency}
                {itemTotal.toFixed(0)}
              </span>
              <button
                type="button"
                onClick={onRemove}
                className="flex items-center gap-1 text-xs font-semibold text-[#e00000] hover:underline"
              >
                <FiTrash2 className="w-3 h-3" />
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop / tablet table row */}
      <div className="hidden sm:grid sm:grid-cols-[0.9fr_1.6fr_1fr_1fr_1fr] sm:items-center sm:gap-4">
        {/* Item image */}
        <div className="flex justify-center sm:justify-start">
          <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
            <ResponsiveImage
              images={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
              shouldFill
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1 text-sm text-gray-700">
          <span className="text-base font-medium line-clamp-1 text-gray-900">
            {item.name}
          </span>
          {item.attributes?.map((attribute, index) => (
            <span
              key={`${item.id}-${attribute}`}
              className={
                index === 0 || attribute.toLowerCase().startsWith('save')
                  ? 'block text-xs font-semibold text-[#007B35]'
                  : 'block text-xs text-gray-500'
              }
            >
              {attribute}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="text-sm sm:text-base font-semibold text-right sm:text-left">
          <div className="flex flex-col">
            {hasSavings && (
              <span className="text-xs text-gray-400 line-through">
                {currency}
                {item.basePrice?.toFixed(0)}
              </span>
            )}
            <span className="text-[#e00000]">
              {currency}
              {item.price.toFixed(0)}
            </span>
          </div>
        </div>

        {/* Quantity + Remove */}
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onQuantityChange(item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              <FiMinus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-semibold">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onQuantityChange(item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              <FiPlus className="w-4 h-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-1 text-xs font-semibold text-[#e00000] hover:underline"
          >
            <FiTrash2 className="w-3 h-3" />
            Remove
          </button>
        </div>

        {/* Total */}
        <div className="text-sm sm:text-base font-semibold text-right">
          {currency}
          {itemTotal.toFixed(0)}
        </div>
      </div>
    </div>
  );
};
