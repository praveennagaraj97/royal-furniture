import { FC } from 'react';

export const OrderDetailSkeleton: FC = () => {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />

      {/* Product summary card skeleton */}
      <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden p-4 flex gap-4">
        <div className="w-24 h-24 rounded-lg bg-gray-200 animate-pulse shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-3">
            <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Two-column layout skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2.2fr)] gap-6">
        {/* Left column: expected delivery + tracking */}
        <div className="space-y-4">
          <div className="rounded-sm border border-red-100 bg-[#FFF5F4] px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 bg-red-200 rounded animate-pulse" />
              <div className="h-3 w-40 bg-green-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
                <div className="flex-1 space-y-1">
                  <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
                  <div className="h-2.5 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: shipping address + order summary + pickup info */}
        <div className="space-y-4">
          <div className="rounded-sm border border-gray-200 bg-white p-4 space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="space-y-1">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-3 w-full bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
          <div className="rounded-sm border border-gray-200 bg-white p-4 space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
              <div className="mt-2 pt-2 border-t border-gray-200 flex items-center justify-between gap-2">
                <div className="h-3 w-28 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
          <div className="rounded-sm border border-gray-200 bg-white p-4 space-y-2">
            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailSkeleton;
