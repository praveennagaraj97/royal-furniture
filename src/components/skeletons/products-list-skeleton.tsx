import { type FC } from 'react';

interface ProductsListSkeletonProps {
  isFilterVisible?: boolean;
}

export const ProductsListSkeleton: FC<ProductsListSkeletonProps> = ({
  isFilterVisible = false,
}) => {
  return (
    <div
      className={`flex-1 transition-all duration-300 ${
        isFilterVisible ? 'lg:w-3/4' : 'w-full'
      }`}
    >
      <div
        className={`grid gap-x-3 gap-y-6 transition-all duration-300 ${
          isFilterVisible
            ? 'grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-2 lg:grid-cols-4'
        }`}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="relative w-full bg-white rounded-lg overflow-hidden"
          >
            {/* Image skeleton */}
            <div className="aspect-4/4.5 bg-gray-200 rounded-lg animate-pulse mb-3" />

            {/* Content skeleton */}
            <div className="space-y-2">
              {/* Price skeleton */}
              <div className="flex items-center gap-2">
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Product name skeleton */}
              <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />

              {/* Button skeleton */}
              <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
