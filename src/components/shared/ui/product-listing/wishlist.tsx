'use client';

import { useUser } from '@/contexts/user-context';
import { FC, MouseEvent, useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { useWishlistActions } from '@/hooks/use-wishlist-actions';
import AddToWishlistModal from '@/components/user/wishlist/add-to-wishlist-modal';

interface WishlistActionProps {
  variantId?: number;
  isInWishlist?: boolean;
  productId?: number;
}

const WishlistAction: FC<WishlistActionProps> = ({
  variantId,
  isInWishlist = false,
  productId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();
  const { removeFromWishlist, isRemoving } = useWishlistActions();

  const handleFavoriteClick = async (e: MouseEvent) => {
    e.stopPropagation();

    if (!user || !variantId) {
      return;
    }

    if (isInWishlist) {
      // Remove from wishlist
      try {
        await removeFromWishlist(variantId);
      } catch (error) {
        // Error is handled in the hook with toast
      }
    } else {
      // Show modal to select collection
      setIsModalOpen(true);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <button
        onClick={handleFavoriteClick}
        disabled={isRemoving}
        className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-300 hover:border-gray-400 transition-all duration-200 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <FiHeart
          className={`w-4 h-4 transition-colors duration-200 ${
            isInWishlist ? 'fill-deep-maroon text-deep-maroon' : 'text-black'
          }`}
        />
      </button>

      {variantId && (
        <AddToWishlistModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          variantId={variantId}
          productId={productId}
        />
      )}
    </>
  );
};

export default WishlistAction;
