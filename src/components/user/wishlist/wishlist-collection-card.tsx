'use client';

import ResponsiveImage from '@/components/shared/ui/responsive-image';
import { AppLink } from '@/hooks';
import { WishlistCollection } from '@/types/response';
import { FC } from 'react';
import { FiHeart } from 'react-icons/fi';

interface WishlistCollectionCardProps {
  collection: WishlistCollection;
}

const WishlistCollectionCard: FC<WishlistCollectionCardProps> = ({
  collection,
}) => {
  const displayItems = (collection.preview_items || []).slice(0, 4);
  const remainingCount = Math.max(
    0,
    collection.total_items - displayItems.length,
  );

  return (
    <AppLink
      href={`/user/wishlist/${collection.id}`}
      className="block bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
    >
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <FiHeart className="w-5 h-5 text-deep-maroon fill-deep-maroon" />
          <h3 className="text-lg font-semibold  ">{collection.title}</h3>

          <p className="text-sm text-gray-500">
            {collection.total_items}{' '}
            {collection.total_items === 1 ? 'Item' : 'Items'}
          </p>
        </div>
      </div>

      <div className="p-4">
        {displayItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4">
            <div className="relative mb-4">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                <FiHeart className="w-6 h-6 text-gray-400" />
              </div>
            </div>
            <h3 className="text-lg font-semibold   mb-2">
              No Items in this collection
            </h3>
          </div>
        ) : (
          <div className="flex gap-3 justify-start overflow-x-auto flex-nowrap">
            {displayItems.map((item, index) => (
              <div
                key={`${item.product_name}-${index}`}
                className="relative rounded overflow-hidden bg-gray-100 aspect-square w-40"
              >
                {item.responsive_images ? (
                  <ResponsiveImage
                    images={item.responsive_images}
                    alt={item.product_name || ''}
                    className="w-full h-full object-cover"
                  />
                ) : item.product_image ? (
                  // Fallback to raw image URL when responsive images are not provided by API
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.product_image}
                    alt={item.product_name || ''}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}

                {index === displayItems.length - 1 && remainingCount > 0 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-lg font-semibold">
                    +{remainingCount}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLink>
  );
};

export default WishlistCollectionCard;
