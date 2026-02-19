'use client';

import { useAuth } from '@/contexts/auth-context';
import { useGetProductDetail } from '@/hooks/api';
import { useWishlistActions } from '@/hooks/use-wishlist-actions';
import { FC, Fragment, useState, type MouseEvent } from 'react';
import { FiHeart } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';
import AddToWishlistModal from './modal';

interface AddToWishListProps {
  variantId?: number | null;
  productSlug?: string | null;
}

const AddToWishList: FC<AddToWishListProps> = ({
  variantId,
  productSlug = null,
}) => {
  const { isAuthenticated } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);

  // Derive wishlist status from product detail API (slug-based)
  const { isVariantWishlisted, mutate } = useGetProductDetail({
    productSlug: productSlug ?? null,
    enabled: isAuthenticated && Boolean(productSlug),
  });

  const { removeFromWishlist, isAdding, isRemoving } = useWishlistActions();

  const isWishlisted = isVariantWishlisted(variantId ?? null);
  const isLoading = isAdding || isRemoving;

  const handleClick = async (e: MouseEvent) => {
    e.stopPropagation();

    if (!variantId) return;

    if (isWishlisted) {
      try {
        await removeFromWishlist(variantId);

        // Optimistically update product detail cache: mark variant as not wishlisted
        mutate?.((current) => {
          if (!current) return current;
          try {
            const copy = JSON.parse(JSON.stringify(current));
            const product = copy.data;
            for (const variantGroup of product.variants || []) {
              for (const fabric of variantGroup.fabricsList || []) {
                for (const color of fabric.colorsList || []) {
                  if (color.variant_id === variantId) {
                    color.is_wishlist = false;
                  }
                }
              }
            }
            return copy;
          } catch {
            return current;
          }
        }, false);
      } catch {
        // errors are shown in hook
      }
      return;
    }

    setShowAddModal(true);
  };

  // Do not render icon if there's no variantId or user is not authenticated
  if (!variantId || !isAuthenticated) return null;

  return (
    <Fragment>
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md disabled:opacity-60"
      >
        {isLoading ? (
          <ImSpinner2 className="w-5 h-5 animate-spin text-gray-700" />
        ) : (
          <FiHeart
            className={`w-5 h-5 ${
              isWishlisted
                ? 'fill-deep-maroon text-deep-maroon'
                : 'text-gray-700'
            }`}
          />
        )}
      </button>
      <AddToWishlistModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        variantId={variantId}
        onSuccess={() => mutate?.()}
      />
    </Fragment>
  );
};

export default AddToWishList;
