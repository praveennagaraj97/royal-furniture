'use client';

import { FC, Fragment, useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import AddToWishlistModal from './modal';

const AddToWishList: FC = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <Fragment>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setShowAddModal(true);
        }}
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
        onClose={() => {
          setShowAddModal(false);
        }}
        variantId={1}
      />
    </Fragment>
  );
};

export default AddToWishList;
