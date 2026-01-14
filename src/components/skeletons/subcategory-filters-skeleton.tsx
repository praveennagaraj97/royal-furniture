import { type FC } from 'react';

export const SubcategoryFiltersSkeleton: FC = () => {
  return (
    <div className="space-y-6 min-w-0 w-full lg:pr-4">
      {[1, 2, 3, 4].map((index) => (
        <div
          key={index}
          className="border-b border-gray-200 pb-4 last:border-0 last:pb-0"
        >
          <div className="space-y-3">
            {/* Title skeleton */}
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-gray-200 animate-pulse" />
              <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
            </div>

            {/* Options skeleton */}
            <div className="space-y-2.5">
              {[1, 2, 3, 4].map((optionIndex) => (
                <div
                  key={optionIndex}
                  className="flex items-center gap-2.5 justify-between"
                >
                  <div className="h-4 flex-1 rounded bg-gray-200 animate-pulse" />
                  <div className="h-4 w-4 rounded-full bg-gray-200 animate-pulse shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
