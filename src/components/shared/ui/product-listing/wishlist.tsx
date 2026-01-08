'use client';

import { useUser } from '@/contexts/user-context';
import { FC, MouseEvent, useState } from 'react';
import { FiHeart } from 'react-icons/fi';

const WishlistAction: FC = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useUser();

  const handleFavoriteClick = (e: MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  if (!user) {
    return null;
  }

  return (
    <button
      onClick={handleFavoriteClick}
      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-300 hover:border-gray-400 transition-all duration-200 z-10"
      aria-label="Add to wishlist"
    >
      <FiHeart
        className={`w-4 h-4 transition-colors duration-200 ${
          isFavorite ? 'fill-black text-black' : 'text-black'
        }`}
      />
    </button>
  );
};

export default WishlistAction;
