'use client';

import { useAuth } from '@/contexts/auth-context';
import { FC, Fragment, useState, type MouseEvent } from 'react';
import { FiHeart } from 'react-icons/fi';
import AddToWishlistModal from './modal';

interface AddToWishListProps {
  variantId?: number | null;
  isWishlisted?: boolean;
}

const AddToWishList: FC<AddToWishListProps> = ({
  variantId,
  isWishlisted = false,
}) => {
  const { isAuthenticated } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    setShowAddModal(true);
  };

  // Do not render icon if there's no variantId or user is not authenticated
  if (!variantId || !isAuthenticated) return null;

  return (
    <Fragment>
      <button
        type="button"
        onClick={handleClick}
        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
      >
        <FiHeart
          className={`w-5 h-5 ${
            isWishlisted ? 'fill-deep-maroon text-deep-maroon' : 'text-gray-700'
          }`}
        />
      </button>
      <AddToWishlistModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        variantId={variantId}
      />
    </Fragment>
  );
};

export default AddToWishList;
