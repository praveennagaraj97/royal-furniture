'use client';

import { useUser } from '@/contexts/user-context';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';
import { SlideIn } from '../../animations';

const AddToCart: FC = () => {
  const [quantity, setQuantity] = useState(1);

  const t = useTranslations();
  const { user } = useUser();

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta);
    setQuantity(newQuantity);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!user) {
    return null;
  }

  return (
    <SlideIn direction="up" fade>
      {/* Quantity Selector */}
      <div className="flex items-center gap-2 mb-4">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleQuantityChange(-1);
          }}
          disabled={quantity <= 1}
          className="w-8 h-8 rounded-full border border-deep-maroon flex items-center justify-center text-deep-maroon hover:bg-deep-maroon/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shrink-0"
          aria-label="Decrease quantity"
        >
          <FiMinus className="w-3 h-3" />
        </button>
        <span className="text-gray-900 font-bold text-base min-w-6 text-center">
          {quantity}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleQuantityChange(1);
          }}
          className="w-8 h-8 rounded-full border border-deep-maroon flex items-center justify-center text-deep-maroon hover:bg-deep-maroon/10 transition-colors duration-200 shrink-0"
          aria-label="Increase quantity"
        >
          <FiPlus className="w-3 h-3" />
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        type="button"
        onClick={handleAddToCart}
        className="w-full flex items-center justify-center gap-2 border border-deep-maroon text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-deep-maroon/10 transition-colors duration-200"
      >
        <FiShoppingCart className="text-xl text-deep-maroon" />
        <span>{t('common.addToCart')}</span>
      </button>
    </SlideIn>
  );
};

export default AddToCart;
