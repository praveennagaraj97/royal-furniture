'use client';

import { StaggerItem } from '@/components/shared/animations';
import Image from 'next/image';
import { FC, useState } from 'react';
import { FiHeart, FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';

import { Product } from '@/temp/data/products-data';

export interface ProductCardWithCartProps {
  product: Product;
  onAddToCart?: (productId: string, quantity: number) => void;
}

const ProductCardWithCart: FC<ProductCardWithCartProps> = ({
  product,
  onAddToCart,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta);
    setQuantity(newQuantity);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product.id, quantity);
    }
  };

  return (
    <StaggerItem
      type="slideUp"
      distance={30}
      duration={0.6}
      className="relative w-full min-w-[280px] sm:min-w-[300px] bg-white rounded-lg overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/4.5] overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 280px, (max-width: 768px) 300px, 320px"
        />

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-deep-maroon text-white text-xs font-semibold px-2.5 py-1 rounded-md z-10">
            {product.discount}% OFF
          </div>
        )}

        {/* Favorite Button */}
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
      </div>

      {/* Product Info Section */}
      <div className="p-4 space-y-3">
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-red-600 font-bold text-lg">
            ฿ {product.price.toLocaleString()}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-gray-400 text-sm font-medium line-through">
              ฿ {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Product Name */}
        <p className="text-gray-900 text-base">{product.name}</p>

        {/* Quantity Selector */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleQuantityChange(-1);
            }}
            disabled={quantity <= 1}
            className="w-8 h-8 rounded-full border border-red-600 flex items-center justify-center text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shrink-0"
            aria-label="Decrease quantity"
          >
            <FiMinus className="w-3 h-3" />
          </button>
          <span className="text-gray-900 font-bold text-base min-w-[24px] text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleQuantityChange(1);
            }}
            className="w-8 h-8 rounded-full border border-red-600 flex items-center justify-center text-red-600 hover:bg-red-50 transition-colors duration-200 shrink-0"
            aria-label="Increase quantity"
          >
            <FiPlus className="w-3 h-3" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 border border-red-600 text-gray-900 py-2.5 px-4 rounded-lg font-medium hover:bg-red-50 transition-colors duration-200"
        >
          <FiShoppingCart className="w-4 h-4 text-black" />
          <span>Add to cart</span>
        </button>
      </div>
    </StaggerItem>
  );
};

export default ProductCardWithCart;
