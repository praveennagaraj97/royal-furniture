import { type FC } from 'react';

export const UserReviewsSkeleton: FC = () => {
  return (
    <div className="space-y-6">
      {/* Overall Rating + Distribution skeleton matching layout */}
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 items-start">
        {/* Left: overall rating summary skeleton */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="h-12 w-12 rounded bg-gray-200 animate-pulse" />
            <div className="space-y-2">
              <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Right: rating distribution skeleton - exact layout */}
        <div className="w-full space-y-2.5 sm:border-l-2 sm:border-gray-300 sm:pl-3">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-2">
              <span className="text-xs md:text-sm w-4 shrink-0">{stars}</span>
              <div className="flex-1 min-w-0 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gray-300 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews list skeleton matching each review layout */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-10 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-3/4 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>

            <div className="flex gap-2 ml-12 overflow-x-auto">
              {Array.from({ length: 3 }).map((_, s) => (
                <div
                  key={s}
                  className="w-20 h-20 rounded overflow-hidden bg-gray-200 animate-pulse shrink-0"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReviewsSkeleton;
