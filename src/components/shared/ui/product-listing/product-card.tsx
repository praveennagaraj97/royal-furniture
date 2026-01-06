'use client';

import { StaggerItem } from '@/components/shared/animations';
import Image from 'next/image';
import { FC, useState } from 'react';
import { FiHeart } from 'react-icons/fi';

import { AppLink } from '@/hooks';
import { ProductItem } from '@/types/response/home-page';

export interface ProductCardProps {
  product: ProductItem;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(product.is_in_wishlist);
  const [isHovered, setIsHovered] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <StaggerItem
      type="slideUp"
      distance={30}
      duration={0.6}
      className="relative w-full min-w-70 sm:min-w-75 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AppLink href={`/${product.sub_category.id}/${product.id}`}>
        {/* Image Container */}
        <div className="relative w-full aspect-[4/4.5] rounded-lg overflow-hidden bg-gray-100 mb-3">
          <Image
            src={product.thumbnail_image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300"
            sizes="(max-width: 640px) 280px, (max-width: 768px) 300px, 320px"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />

          {/* Discount Badge */}
          {product.pricing.offer_percentage > 0 && (
            <div className="absolute top-3 left-3 bg-deep-maroon text-white text-xs font-semibold px-2.5 py-1 rounded-md z-10">
              {product.pricing.offer_percentage}% OFF
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 z-10 hover:scale-110"
            aria-label="Add to wishlist"
          >
            <FiHeart
              className={`w-4 h-4 transition-colors duration-200 ${
                isFavorite ? 'fill-black text-black' : 'text-black'
              }`}
            />
          </button>
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-semibold text-lg">
              ฿ {product.pricing.offer_price}
            </span>
            {product.pricing.base_price !== product.pricing.offer_price && (
              <span className="text-gray-400 text-sm font-medium line-through">
                ฿ {product.pricing.base_price}
              </span>
            )}
          </div>

          {/* Product Name */}
          <p className="text-indigo-slate text-base">{product.name}</p>
        </div>
      </AppLink>
    </StaggerItem>
  );
};

export default ProductCard;
