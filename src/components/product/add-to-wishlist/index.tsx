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
  variant?: 'default' | 'minimal';
}

const AddToWishList: FC<AddToWishListProps> = ({
  variantId,
  isVariantWishlisted,
  updateVariantWishlist,
  variant = 'default',
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

  const buttonClasses =
    variant === 'minimal'
      ? 'w-auto h-auto bg-transparent rounded-none shadow-none p-0 flex items-center justify-center'
      : 'w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md';

  const spinnerColor =
    variant === 'minimal' ? 'text-deep-maroon' : 'text-gray-700';

  const iconSizeClasses = variant === 'minimal' ? 'w-6 h-6' : 'w-5 h-5';
  const iconColorClasses = isWishlisted
    ? 'fill-deep-maroon text-deep-maroon'
    : variant === 'minimal'
      ? 'text-deep-maroon'
      : 'text-gray-700';

  return (
    <Fragment>
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className={`${buttonClasses} disabled:opacity-60`}
      >
        {isLoading ? (
          <ImSpinner2 className={`w-5 h-5 animate-spin ${spinnerColor}`} />
        ) : (
          <FiHeart className={`${iconSizeClasses} ${iconColorClasses}`} />
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
