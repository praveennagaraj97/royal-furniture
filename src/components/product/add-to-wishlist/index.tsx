'use client';

import { FC, useState } from 'react';
import { FiHeart } from 'react-icons/fi';

const AddToWishList: FC = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
    >
      <FiHeart
        className={`w-5 h-5 ${
          isWishlisted ? 'fill-deep-maroon text-deep-maroon' : 'text-gray-700'
        }`}
      />
    </button>
  );
};

export default AddToWishList;
