import { type FC } from 'react';

export const WishlistCollectionsSkeleton: FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm animate-pulse"
        >
          {/* Header Skeleton */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded bg-gray-200" />
              <div className="h-5 w-32 bg-gray-200 rounded" />
            </div>
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>

          {/* Product Thumbnails Grid Skeleton */}
          <div className="p-4">
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((thumbIndex) => (
                <div
                  key={thumbIndex}
                  className="aspect-square bg-gray-200 rounded"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
