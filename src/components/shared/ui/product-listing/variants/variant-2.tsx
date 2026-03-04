'use client';

import AddToCartWrapper from '@/components/shared/ui/add-to-cart';
import ResponsiveImage from '@/components/shared/ui/responsive-image';
import { FC, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';

import { useCart } from '@/contexts/cart-context';
import { AppLink, useAppRouter } from '@/hooks';
import { useFormatCurrency } from '@/hooks/use-format-currency';
import { ProductItem } from '@/types';
import { useTranslations } from 'next-intl';

export interface ProductCardVariant2Props {
  product: ProductItem;
  className?: string;
  enableAddToCart?: boolean;
}

export const ProductCardVariant2: FC<ProductCardVariant2Props> = ({
  product,
  className,
  enableAddToCart = false,
}) => {
  const formatCurrency = useFormatCurrency();
  const tCommon = useTranslations('common');
  const tActions = useTranslations('product.actions');
  const { addItem, items, moveToCart } = useCart();
  const [isMoving, setIsMoving] = useState(false);
  // const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { push } = useAppRouter();

  const offerPercentage = parseFloat(product.pricing.offer_percentage || '0');
  const hasDiscount = offerPercentage > 0;
  const productSku = product.product_sku?.trim();
  const isOutOfStock =
    product.is_out_of_stock ||
    product.stock_status?.status === 'out_of_stock' ||
    (typeof product.stock_count === 'number' && product.stock_count <= 0);
  const isInCart = items.some(
    (item) =>
      String(item.id) === String(productSku) ||
      String(item.id) === String(product.id),
  );

  const modalProduct = {
    product_info: { name: product.name },
    similar_products: [],
  };

  const handleMoveToCart = async () => {
    if (!product.cart_item_id || isMoving) return;

    try {
      setIsMoving(true);
      await moveToCart(product.cart_item_id);
      push('/checkout/cart');
    } finally {
      setIsMoving(false);
    }
  };

  // const handleQuantityChange = (delta: number) => {
  //   setQuantity((prev) => Math.max(1, prev + delta));
  // };

  const handleAddToCart = async () => {
    if (isAdding || isInCart) return false;
    if (isOutOfStock) return false;
    if (!productSku) return false;

    try {
      setIsAdding(true);
      await addItem(productSku, 1);
      return true;
    } catch {
      return false;
    } finally {
      setIsAdding(false);
    }
  };

  const handleGoToCart = () => {
    push('/checkout/cart');
  };

  return (
    <div
      className={`relative w-full bg-white rounded-lg overflow-hidden ${className || ''}`}
    >
      <AppLink
        href={`/${product.category.slug}/${product.sub_category.slug}/${product.slug}`}
      >
        {/* Image Container with Overlays */}
        <div className="group/image relative w-full overflow-visible mb-3">
          <div className="relative w-full  overflow-hidden">
            <ResponsiveImage
              images={product.responsive_images}
              alt={product.name}
              className="transition-transform duration-300 group-hover/image:scale-105 aspect-square"
              shouldFill
            />

            {/* Discount Badge - Top Left */}
            {hasDiscount && (
              <div className="absolute top-3 left-3 bg-deep-maroon text-white text-xs font-bold px-3 py-1.5 rounded z-10">
                {offerPercentage.toFixed(0)}% OFF
              </div>
            )}
          </div>

          {/* Add to Cart Button - Show only on group hover */}
          <button
            className="absolute bottom-0 right-2 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 z-10 shadow-sm translate-y-1/2 opacity-0 group-hover/image:opacity-100 pointer-events-none group-hover/image:pointer-events-auto"
            aria-label="Add to cart"
          >
            <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
        </div>

        {/* Product Info Section */}
        <div className="space-y-1">
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-semibold text-xs sm:text-base">
              {formatCurrency(product.pricing.offer_price || 0)}
            </span>
            {product.pricing.base_price &&
              product.pricing.base_price !== product.pricing.offer_price && (
                <span className="text-gray-400 text-xs font-medium line-through">
                  {formatCurrency(product.pricing.base_price || 0)}
                </span>
              )}
          </div>

          {/* Product Name */}
          <p className="text-sm sm:text-base line-clamp-1">{product.name}</p>

          {/* Color Options */}
          {product.available_colors && product.available_colors.length > 0 && (
            <div className="flex items-center gap-2 pt-1">
              {product.available_colors.slice(0, 4).map((color) => (
                <div
                  key={color.id}
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-gray-200 shadow-sm"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.available_colors.length > 4 && (
                <span className="text-xs text-gray-500 ml-1">
                  +{product.available_colors.length - 4}
                </span>
              )}
            </div>
          )}
          {/* View Count - Below Colors */}
          {/* <div className="flex items-center gap-1.5 pt-1">
            <FiEye className="w-4 h-4 text-green-600" />
            <span className="text-gray-600 text-sm">156 views in 24 hrs</span>
          </div> */}
        </div>
      </AppLink>

      {enableAddToCart && !product.cart_item_id ? (
        <div className="mt-2">
          {/* {!isInCart && !isOutOfStock ? (
            <div className="flex items-center gap-2 mb-3">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleQuantityChange(-1);
                }}
                disabled={quantity <= 1 || isAdding}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-deep-maroon flex items-center justify-center text-deep-maroon hover:bg-deep-maroon/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                aria-label="Decrease quantity"
              >
                <FiMinus className="w-3 h-3" />
              </button>
              <span className="font-bold text-xl min-w-6 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleQuantityChange(1);
                }}
                disabled={isAdding}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-deep-maroon flex items-center justify-center text-deep-maroon hover:bg-deep-maroon/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                aria-label="Increase quantity"
              >
                <FiPlus className="w-3 h-3" />
              </button>
            </div>
          ) : null} */}

          {isOutOfStock ? (
            <button
              type="button"
              disabled
              className="w-full flex items-center justify-center gap-2 border border-amber-200 text-amber-900 bg-amber-50 py-1.5 px-3 sm:py-2 sm:px-4 rounded-lg font-medium opacity-90 cursor-not-allowed"
            >
              <FiShoppingCart className="text-lg sm:text-xl" />
              <span>{tActions('outOfStock')}</span>
            </button>
          ) : (
            <AddToCartWrapper
              product={modalProduct}
              mainVariantImage={product.responsive_images}
              onOpen={handleAddToCart}
              onGoToCart={handleGoToCart}
              disableOpen={isInCart}
            >
              {isInCart ? (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleGoToCart();
                  }}
                  className="w-full flex items-center justify-center gap-2 border border-emerald-200 text-emerald-700 bg-emerald-50 py-1.5 px-3 sm:py-2 sm:px-4 rounded-lg font-medium"
                >
                  <FiShoppingCart className="text-lg sm:text-xl" />
                  <span>{tCommon('inCart')}</span>
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isAdding || !productSku}
                  className="w-full flex items-center justify-center gap-2 border border-deep-maroon py-1.5 px-3 sm:py-2 sm:px-4 rounded-lg font-medium text-deep-maroon hover:bg-deep-maroon/10 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <FiShoppingCart className="text-lg sm:text-xl" />
                  <span>
                    {isAdding
                      ? `${tCommon('addToCart')}...`
                      : tCommon('addToCart')}
                  </span>
                </button>
              )}
            </AddToCartWrapper>
          )}
        </div>
      ) : null}

      {product.cart_item_id && (
        <div className="p-px">
          <button
            type="button"
            onClick={handleMoveToCart}
            disabled={isMoving}
            className="mt-2 inline-flex w-full items-center justify-center px-3 py-1.5 text-xs sm:text-sm font-medium rounded border border-deep-maroon text-deep-maroon hover:bg-deep-maroon/5 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isMoving ? 'Moving...' : 'Move to cart'}
          </button>
        </div>
      )}
    </div>
  );
};
