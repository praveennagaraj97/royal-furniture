'use client';

import { FC } from 'react';

export const ShippingPageSkeleton: FC = () => {
  return (
    <div className="section-container">
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,0.9fr)]">
        {/* Left column: shipping method + address */}
        <div className="space-y-6">
          {/* Shipping Method Section Skeleton */}
          <section className="space-y-3">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-24 rounded-xl border border-gray-200 bg-white p-4 animate-pulse" />
              <div className="h-24 rounded-xl border border-gray-200 bg-white p-4 animate-pulse" />
            </div>
          </section>

          {/* Shipping Address Section Skeleton */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                  <div className="h-3 w-48 bg-gray-200 rounded" />
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right column: Order Summary + Delivery Options */}
        <div className="space-y-6 lg:self-start z-30 lg:sticky lg:top-28">
          {/* Order Summary Skeleton */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4 space-y-4">
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-sm text-gray-700"
                >
                  <div className="h-3 w-28 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
            <div className="h-px bg-gray-200" />
            <div className="flex items-center justify-between">
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse" />
          </div>

          {/* Delivery Info Card Skeleton */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-200" />
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-3 w-32 bg-gray-200 rounded" />
              </div>
            </div>
          </div>

          {/* Delivery Options Skeleton */}
          <section className="space-y-3">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-4 animate-pulse">
              <div className="h-10 w-full bg-gray-200 rounded-lg" />
              <div className="h-10 w-full bg-gray-200 rounded-lg" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingPageSkeleton;
