import { type FC } from 'react';

export const OrdersListSkeleton: FC = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <article
          key={index}
          className="bg-white border border-gray-100 rounded-md shadow-sm overflow-hidden"
        >
          {/* Header skeleton */}
          <div className="flex items-center justify-between gap-3 px-4 pt-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-3 flex-1">
              <div className="p-2 rounded-full bg-gray-100 animate-pulse w-10 h-10" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-28 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse" />
          </div>

          {/* Body skeleton */}
          <div className="px-4 py-4 flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="flex gap-4 flex-1">
              <div className="w-24 h-24 rounded-lg bg-gray-200 animate-pulse shrink-0" />

              <div className="flex flex-col justify-between flex-1 min-w-0 gap-3">
                <div className="space-y-2">
                  <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                  <div className="h-5 w-48 bg-gray-200 rounded animate-pulse" />
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>

            <div className="flex w-full items-center gap-3 mt-3 sm:mt-0 sm:w-auto sm:ml-auto">
              <div className="h-9 w-full sm:w-28 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-9 w-full sm:w-24 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default OrdersListSkeleton;
