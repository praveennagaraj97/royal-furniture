import { type FC } from 'react';

export const SearchResultsSkeleton: FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-h-[80vh] overflow-y-auto">
      <div className="p-4">
        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-4" />
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
            <div key={index} className="space-y-1">
              <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-2.5 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
