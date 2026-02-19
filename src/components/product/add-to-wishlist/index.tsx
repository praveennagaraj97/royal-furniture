'use client';

import { useAuth } from '@/contexts/auth-context';
import { useWishlistActions } from '@/hooks/use-wishlist-actions';
import { FC, Fragment, useState, type MouseEvent } from 'react';
import { FiHeart } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';
import AddToWishlistModal from './modal';

interface AddToWishListProps {
  variantId?: number | null;
  // Provided by parent (ProductDetail) via `useGetProductDetail`
  isVariantWishlisted?: (variantId?: number | null) => boolean;
  updateVariantWishlist?: (variantId: number, value: boolean) => void;
}

const AddToWishList: FC<AddToWishListProps> = ({
  variantId,
  isVariantWishlisted,
  updateVariantWishlist,
}) => {
  const { isAuthenticated } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);

  const { removeFromWishlist, isAdding, isRemoving } = useWishlistActions();

  const isWishlisted = (isVariantWishlisted || (() => false))(
    variantId ?? null,
  );
  const isLoading = isAdding || isRemoving;

  const handleClick = async (e: MouseEvent) => {
    e.stopPropagation();

    if (!variantId) return;

    if (isWishlisted) {
      try {
        await removeFromWishlist(variantId);

        // Optimistically update product detail cache: mark variant as not wishlisted
        updateVariantWishlist?.(variantId, false);
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
        onSuccess={() => updateVariantWishlist?.(variantId as number, true)}
      />
    </Fragment>
  );
};

export default AddToWishList;
