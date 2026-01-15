'use client';

import { AppLink } from '@/hooks';
import Image from 'next/image';
import { FC } from 'react';
import { FiHeart } from 'react-icons/fi';

interface WishlistCollectionCardProps {
  collection: {
    id: string;
    name: string;
    itemCount: number;
    thumbnail: string;
    products: Array<{
      id: string;
      thumbnail: string;
      name: string;
    }>;
  };
}

const WishlistCollectionCard: FC<WishlistCollectionCardProps> = ({
  collection,
}) => {
  const displayProducts = collection.products.slice(0, 4);
  const remainingCount = collection.itemCount - displayProducts.length;

  return (
    <AppLink
      href={`/user/wishlist/${collection.id}`}
      className="block bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          {collection.name === 'My Wishlist' ? (
            <FiHeart className="w-5 h-5 text-deep-maroon fill-deep-maroon" />
          ) : (
            <div className="w-5 h-5 rounded overflow-hidden">
              <Image
                src={collection.thumbnail}
                alt={collection.name}
                width={20}
                height={20}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <h3 className="text-lg font-semibold text-gray-900">
            {collection.name}
          </h3>
        </div>
        <p className="text-sm text-gray-500">{collection.itemCount} Items</p>
      </div>

      {/* Product Thumbnails Grid */}
      <div className="p-4">
        <div className="grid grid-cols-4 gap-2">
          {displayProducts.map((product, index) => (
            <div
              key={product.id}
              className="relative aspect-square rounded overflow-hidden bg-gray-100"
            >
              <Image
                src={product.thumbnail}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 25vw, 150px"
              />
            </div>
          ))}
          {remainingCount > 0 && (
            <div className="relative aspect-square rounded overflow-hidden bg-gray-100 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white text-xs font-semibold">
                  +{remainingCount} More
                </span>
              </div>
              {displayProducts[3] && (
                <Image
                  src={displayProducts[3].thumbnail}
                  alt=""
                  fill
                  className="object-cover opacity-50"
                  sizes="(max-width: 640px) 25vw, 150px"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </AppLink>
  );
};

export default WishlistCollectionCard;
