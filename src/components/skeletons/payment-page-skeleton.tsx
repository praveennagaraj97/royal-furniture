'use client';

import { FC } from 'react';

export const PaymentPageSkeleton: FC = () => {
  return (
    <div className="section-container">
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,0.9fr)]">
        {/* Left column: Payment Methods */}
        <div className="space-y-6">
          {/* Title Skeleton */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
            </div>
          </section>

          {/* Credit & Debit Card Skeleton */}
          <section className="space-y-3">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-full flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 animate-pulse"
                >
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-48 bg-gray-200 rounded" />
                  </div>
                  <div className="shrink-0">
                    <div className="h-4 w-4 rounded-full bg-gray-200" />
                  </div>
                </div>
              ))}
              <div className="w-full flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 animate-pulse">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-gray-200" />
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                </div>
                <div className="ml-auto">
                  <div className="h-4 w-4 rounded-full bg-gray-200" />
                </div>
              </div>
            </div>
          </section>

          {/* Wallets Skeleton */}
          <section className="space-y-3">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-full flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 animate-pulse"
                >
                  <div className="h-6 w-20 bg-gray-200 rounded" />
                  <div className="flex-1">
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                  </div>
                  <div className="shrink-0">
                    <div className="h-4 w-4 rounded-full bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Other Methods Skeleton */}
          <section className="space-y-3">
            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-full flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 animate-pulse"
                >
                  <div className="h-6 w-20 bg-gray-200 rounded" />
                  <div className="flex-1">
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                  </div>
                  <div className="shrink-0">
                    <div className="h-4 w-4 rounded-full bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column: Order Summary */}
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
        </div>
      </div>
    </div>
  );
};

export default PaymentPageSkeleton;
