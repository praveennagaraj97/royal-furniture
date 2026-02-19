'use client';

import ResponsiveImage from '@/components/shared/ui/responsive-image';
import type { CartItem } from '@/types/cart';
import { formatCurrency } from '@/utils/format-currency';
import { useParams } from 'next/navigation';
import { FC, useMemo } from 'react';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';

interface CartItemRowProps {
  item: CartItem;
  pendingAction?: 'increase' | 'decrease' | 'remove';
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export const CartItemRow: FC<CartItemRowProps> = ({
  item,
  pendingAction,
  onQuantityChange,
  onRemove,
}) => {
  const params = useParams<{ country?: string; locale?: string }>();
  const locale = params?.locale ?? 'en';
  const countryCode = params?.country ?? 'ae';

  const itemTotal = item.totalPrice ?? item.price * item.quantity;
  const hasSavings = item.basePrice && item.basePrice > item.price;
  const isBusy = Boolean(pendingAction);
  const isDecreaseBusy = pendingAction === 'decrease';
  const isIncreaseBusy = pendingAction === 'increase';
  const isRemoveBusy = pendingAction === 'remove';

  const decreaseDisabled = isBusy || item.quantity <= 1;
  const increaseDisabled =
    isBusy || (item.stock !== undefined && item.quantity >= item.stock);

  const formattedPrice = useMemo(
    () => formatCurrency(item.price, countryCode, locale),
    [item.price, countryCode, locale],
  );
  const formattedBasePrice = useMemo(
    () =>
      item.basePrice !== undefined
        ? formatCurrency(item.basePrice, countryCode, locale)
        : null,
    [item.basePrice, countryCode, locale],
  );
  const formattedTotal = useMemo(
    () => formatCurrency(itemTotal, countryCode, locale),
    [itemTotal, countryCode, locale],
  );

  return (
    <div className="border-b border-gray-200 pb-4 last:border-none last:pb-0">
      {/* Mobile layout */}
      <div className="flex gap-3 sm:hidden">
        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0">
          <ResponsiveImage
            images={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
            shouldFill
          />
        </div>

        <div className="flex-1 flex items-stretch gap-3 text-sm text-gray-700">
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
            <div className="flex items-center gap-2">
              {hasSavings && formattedBasePrice && (
                <span className="text-xs text-gray-400 line-through">
                  {formattedBasePrice}
                </span>
              )}
              <span className="text-[#e00000] font-semibold">
                {formattedPrice}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onQuantityChange(item.quantity - 1)}
                disabled={decreaseDisabled}
                className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDecreaseBusy ? (
                  <ImSpinner2 className="w-4 h-4 animate-spin" />
                ) : (
                  <FiMinus className="w-4 h-4" />
                )}
              </button>
              <span className="w-8 text-center font-semibold">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => onQuantityChange(item.quantity + 1)}
                disabled={increaseDisabled}
                className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isIncreaseBusy ? (
                  <ImSpinner2 className="w-4 h-4 animate-spin" />
                ) : (
                  <FiPlus className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-3 text-sm font-semibold text-gray-900">
              <span>{formattedTotal}</span>
              <button
                type="button"
                onClick={onRemove}
                disabled={isBusy}
                className="flex items-center gap-1 text-xs font-semibold text-[#e00000] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRemoveBusy ? (
                  <ImSpinner2 className="w-3 h-3 animate-spin" />
                ) : (
                  <FiTrash2 className="w-3 h-3" />
                )}
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop / tablet layout */}
      <div className="hidden sm:grid sm:grid-cols-[0.9fr_1.6fr_1fr_1fr_1fr] sm:items-center sm:gap-4">
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

        <div className="flex flex-col gap-1 text-sm">
          {hasSavings && formattedBasePrice && (
            <span className="text-xs text-gray-400 line-through">
              {formattedBasePrice}
            </span>
          )}
          <span className="text-[#e00000] font-semibold">{formattedPrice}</span>
        </div>

        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onQuantityChange(item.quantity - 1)}
              disabled={decreaseDisabled}
              className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDecreaseBusy ? (
                <ImSpinner2 className="w-4 h-4 animate-spin" />
              ) : (
                <FiMinus className="w-4 h-4" />
              )}
            </button>
            <span className="w-8 text-center font-semibold">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onQuantityChange(item.quantity + 1)}
              disabled={increaseDisabled}
              className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isIncreaseBusy ? (
                <ImSpinner2 className="w-4 h-4 animate-spin" />
              ) : (
                <FiPlus className="w-4 h-4" />
              )}
            </button>
          </div>
          <button
            type="button"
            onClick={onRemove}
            disabled={isBusy}
            className="flex items-center gap-1 text-xs font-semibold text-[#e00000] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRemoveBusy ? (
              <ImSpinner2 className="w-3 h-3 animate-spin" />
            ) : (
              <FiTrash2 className="w-3 h-3" />
            )}
            Remove
          </button>
        </div>

        <div className="text-sm font-semibold text-gray-900 text-right">
          {formattedTotal}
        </div>
      </div>
    </div>
  );
};
