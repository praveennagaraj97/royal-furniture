'use client';

import { AppLink } from '@/hooks';
import { WishlistCollection } from '@/types/response';
import Image from 'next/image';
import { FC } from 'react';
import { FiHeart } from 'react-icons/fi';

interface WishlistCollectionCardProps {
  collection: WishlistCollection;
}

const WishlistCollectionCard: FC<WishlistCollectionCardProps> = ({
  collection,
}) => {
  const displayItems = collection.preview_items.slice(0, 4);
  const remainingCount = collection.total_items - displayItems.length;

  return (
    <AppLink
      href={`/user/wishlist/${collection.id}`}
      className="block bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          {collection.is_default ? (
            <FiHeart className="w-5 h-5 text-deep-maroon fill-deep-maroon" />
          ) : displayItems.length > 0 ? (
            <div className="w-5 h-5 rounded overflow-hidden">
              <Image
                src={displayItems[0].product_image}
                alt={collection.title}
                width={20}
                height={20}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-5 h-5 rounded bg-gray-200" />
          )}
          <h3 className="text-lg font-semibold text-gray-900">
            {collection.title}
          </h3>
        </div>
        <p className="text-sm text-gray-500">
          {collection.total_items}{' '}
          {collection.total_items === 1 ? 'Item' : 'Items'}
        </p>
      </div>

      {/* Product Thumbnails Grid */}
      <div className="p-4">
        {displayItems.length > 0 ? (
          <div className="grid grid-cols-4 gap-2">
            {displayItems.map((item, index) => (
              <div
                key={`${item.product_name}-${index}`}
                className="relative aspect-square rounded overflow-hidden bg-gray-100"
              >
                <Image
                  src={item.product_image}
                  alt={item.product_name}
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
                {displayItems[displayItems.length - 1] && (
                  <Image
                    src={displayItems[displayItems.length - 1].product_image}
                    alt=""
                    fill
                    className="object-cover opacity-50"
                    sizes="(max-width: 640px) 25vw, 150px"
                  />
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center  px-4">
            <div className="relative mb-4">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                <FiHeart className="w-6 h-6 text-gray-400" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Items in this collection
            </h3>
          </div>
        )}
      </div>
    </AppLink>
  );
};

export default WishlistCollectionCard;
