'use client';

import ResponsiveImage from '@/components/shared/ui/responsive-image';
import { AppLink } from '@/hooks';
import type { CartItem } from '@/types/response/cart';
import { formatCurrency } from '@/utils/format-currency';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { CSSProperties, FC, useMemo } from 'react';
import { FiBookmark, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';

interface MobileCartItemProps {
  item: CartItem;
  pendingAction?: 'increase' | 'decrease' | 'remove' | 'save';
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
  onSaveForLater: () => void;
}

export const MobileCartItem: FC<MobileCartItemProps> = ({
  item,
  pendingAction,
  onQuantityChange,
  onRemove,
  onSaveForLater,
}) => {
  const t = useTranslations('checkout.cart.items');
  const params = useParams<{ country?: string; locale?: string }>();
  const locale = params?.locale ?? 'en';
  const countryCode = params?.country ?? 'ae';

  const hasSavings = item.basePrice && item.basePrice > item.price;
  const desktopAttributes = useMemo(
    () =>
      item.attributes?.filter((attribute) => Boolean(attribute?.trim())) ?? [],
    [item.attributes],
  );

  const isBusy = Boolean(pendingAction);
  const isDecreaseBusy = pendingAction === 'decrease';
  const isIncreaseBusy = pendingAction === 'increase';
  const isRemoveBusy = pendingAction === 'remove';
  const isSaveBusy = pendingAction === 'save';

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
  const savingsAmount = useMemo(() => {
    if (typeof item.discountSavings === 'number' && item.discountSavings > 0) {
      return item.discountSavings;
    }

    if (hasSavings && item.basePrice) {
      return item.basePrice - item.price;
    }

    return 0;
  }, [item.discountSavings, hasSavings, item.basePrice, item.price]);
  const formattedSavings = useMemo(
    () =>
      savingsAmount > 0
        ? formatCurrency(savingsAmount, countryCode, locale)
        : null,
    [savingsAmount, countryCode, locale],
  );
  const productHref = useMemo(() => {
    if (!item.categorySlug || !item.subcategorySlug || !item.slug) {
      return null;
    }

    return `/${item.categorySlug}/${item.subcategorySlug}/${item.slug}`;
  }, [item.categorySlug, item.subcategorySlug, item.slug]);

  // const formattedTotal = useMemo(
  //   () => formatCurrency(itemTotal, countryCode, locale),
  //   [itemTotal, countryCode, locale],
  // );

  const infoMessages = useMemo(() => {
    const messages: string[] = [];

    if (formattedSavings) {
      messages.push(`You save ${formattedSavings}`);
    }

    if (item.stock !== undefined) {
      messages.push(`Only ${item.stock} left in stock`);
    }

    return messages;
  }, [formattedSavings, item.stock]);

  const viewsTickerMessage = useMemo(() => {
    if (typeof item.viewCount !== 'number' || item.viewCount <= 0) {
      return null;
    }

    return `${item.viewCount} Customer Viewed this product`;
  }, [item.viewCount]);

  const tickerMessages = useMemo(() => {
    const combined = [
      viewsTickerMessage,
      ...desktopAttributes.slice(1),
      ...infoMessages,
    ].filter((message) => Boolean(message?.trim())) as string[];

    const unique = Array.from(new Set(combined));

    if (!unique.length && desktopAttributes[0]) {
      return [desktopAttributes[0]];
    }

    return unique;
  }, [desktopAttributes, infoMessages, viewsTickerMessage]);

  const tickerTrackMessages = useMemo(
    () =>
      tickerMessages.length > 1
        ? [...tickerMessages, tickerMessages[0]]
        : tickerMessages,
    [tickerMessages],
  );

  const tickerStyle = useMemo(() => {
    if (tickerMessages.length <= 1) {
      return undefined;
    }

    return {
      '--ticker-items': tickerMessages.length,
      '--ticker-item-height': '1.75rem',
      '--ticker-duration': `${Math.max(tickerMessages.length * 2, 6)}s`,
    } as CSSProperties;
  }, [tickerMessages]);

  const headlinePromo =
    desktopAttributes[0] ??
    (formattedSavings
      ? `You save ${formattedSavings}`
      : item.stock
        ? `Only ${item.stock} left in stock`
        : null);

  console.log(productHref);

  return (
    <div className="sm:hidden rounded-xl border border-gray-200 bg-white p-3 shadow-sm space-y-3">
      <div className="flex gap-3">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">
          <ResponsiveImage
            images={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
            shouldFill
          />
        </div>

        <div className="min-w-0 flex-1 space-y-1">
          {productHref ? (
            <AppLink
              href={productHref}
              className="block text-sm leading-5 font-semibold text-gray-900 line-clamp-2"
            >
              {item.name}
            </AppLink>
          ) : (
            <p className="text-sm leading-5 font-semibold text-gray-900 line-clamp-2">
              {item.name}
            </p>
          )}

          {headlinePromo && (
            <p className="text-xs font-semibold text-deep-maroon line-clamp-1">
              {headlinePromo}
            </p>
          )}

          {desktopAttributes.length > 1 && (
            <p className="text-xs text-gray-500 line-clamp-1">
              {desktopAttributes[1]}
            </p>
          )}

          <div className="flex justify-between items-center">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-lg leading-none font-bold text-deep-maroon">
                {formattedPrice}
              </span>
              {hasSavings && formattedBasePrice && (
                <span className="text-xs text-gray-400 line-through">
                  {formattedBasePrice}
                </span>
              )}
            </div>

            {/* <div className="text-xl font-bold">{formattedTotal}</div> */}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex h-8 w-24 items-center justify-between rounded-md border border-gray-300 px-2">
          <button
            type="button"
            onClick={() => onQuantityChange(item.quantity - 1)}
            disabled={decreaseDisabled}
            className="text-sm text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDecreaseBusy ? (
              <ImSpinner2 className="h-3 w-3 animate-spin" />
            ) : (
              <FiMinus className="h-3 w-3" />
            )}
          </button>

          <span className="text-sm font-semibold text-gray-900">
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={() => onQuantityChange(item.quantity + 1)}
            disabled={increaseDisabled}
            className="text-sm text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isIncreaseBusy ? (
              <ImSpinner2 className="h-3 w-3 animate-spin" />
            ) : (
              <FiPlus className="h-3 w-3" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onSaveForLater}
            disabled={isBusy}
            className="flex items-center gap-1 text-xs text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={t('savedForLater')}
            title={t('savedForLater')}
          >
            {isSaveBusy ? (
              <ImSpinner2 className="h-4 w-4 animate-spin" />
            ) : (
              <FiBookmark className="h-4 w-4" />
            )}
            <span>Save</span>
          </button>

          <button
            type="button"
            onClick={onRemove}
            disabled={isBusy}
            className="flex items-center gap-1 text-xs text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={t('remove')}
            title={t('remove')}
          >
            {isRemoveBusy ? (
              <ImSpinner2 className="h-4 w-4 animate-spin" />
            ) : (
              <FiTrash2 className="h-4 w-4" />
            )}
            <span>Remove</span>
          </button>
        </div>
      </div>

      {tickerMessages.length > 0 && (
        <div className="border-t border-gray-300 pt-2">
          <div className="h-7 overflow-hidden">
            <div
              className={
                tickerMessages.length > 1
                  ? 'mobile-cart-promo-track'
                  : undefined
              }
              style={tickerStyle}
            >
              {tickerTrackMessages.map((message, index) => (
                <p
                  key={`${message}-${index}`}
                  className={`h-7 text-xs leading-7 font-medium line-clamp-1 ${
                    /save/i.test(message)
                      ? 'text-green-700'
                      : /viewed this product/i.test(message)
                        ? 'text-sky-700'
                        : index % 2 === 0
                          ? 'text-gray-600'
                          : 'text-deep-maroon'
                  }`}
                >
                  {message}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
