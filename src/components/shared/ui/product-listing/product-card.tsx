'use client';

import { StaggerItem } from '@/components/shared/animations';
import Image from 'next/image';
import { FC, useState } from 'react';
import { FiHeart } from 'react-icons/fi';

import { Link } from '@/i18n/routing';
import { Product } from '@/temp/data/products-data';

export interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
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
      className="relative w-full min-w-[280px] sm:min-w-[300px] cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href="/sofas/italian-right-lounger-with-pull-out-sofa-bed">
        {/* Image Container */}
        <div className="relative w-full aspect-[4/4.5] rounded-lg overflow-hidden bg-gray-100 mb-3">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            className="object-cover transition-transform duration-300"
            sizes="(max-width: 640px) 280px, (max-width: 768px) 300px, 320px"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
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
              ฿ {product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-gray-400 text-sm font-medium line-through">
                ฿ {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Product Name */}
          <p className="text-indigo-slate text-base">{product.name}</p>
        </div>
      </Link>
    </StaggerItem>
  );
};

export default ProductCard;
