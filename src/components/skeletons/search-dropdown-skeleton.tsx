import { type FC } from 'react';

export const SearchDropdownSkeleton: FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-h-[80vh] overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Popular Searches Skeleton */}
        <div>
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-3" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Most Searched Products Skeleton */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="space-y-2">
                <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Trending Products Skeleton */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="aspect-square bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
