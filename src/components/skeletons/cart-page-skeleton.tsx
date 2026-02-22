'use client';

import { FC } from 'react';

const CartItemSkeleton: FC = () => {
  return (
    <div className="border-b border-gray-200 pb-4 last:border-none last:pb-0">
      {/* Mobile layout */}
      <div className="flex gap-3 sm:hidden">
        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-200 animate-pulse shrink-0" />

        <div className="flex-1 flex items-stretch gap-3 text-sm text-gray-700">
          <div className="flex-1 space-y-2">
            <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="flex items-center gap-2">
              <div className="h-4 w-14 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          <div className="flex flex-col items-end justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded border border-gray-200 bg-gray-100 animate-pulse" />
              <div className="w-8 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-8 h-8 rounded border border-gray-200 bg-gray-100 animate-pulse" />
            </div>
            <div className="flex items-center gap-3 text-sm font-semibold text-gray-900">
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop / tablet layout */}
      <div className="hidden sm:grid sm:grid-cols-[0.9fr_1.6fr_1fr_1fr_1fr] sm:items-center sm:gap-4">
        <div className="flex justify-center sm:justify-start">
          <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-200 animate-pulse" />
        </div>

        <div className="flex flex-col gap-2 text-sm text-gray-700">
          <div className="h-5 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-28 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded border border-gray-200 bg-gray-100 animate-pulse" />
            <div className="w-8 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="w-8 h-8 rounded border border-gray-200 bg-gray-100 animate-pulse" />
          </div>
          <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="text-sm font-semibold text-gray-900 text-right">
          <div className="h-4 w-16 bg-gray-200 rounded ms-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export const CartPageSkeleton: FC = () => {
  return (
    <div className="space-y-8">
      <div className="section-container">
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-6">
            <div className="rounded-2xl space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <div className="h-7 w-52 bg-gray-200 rounded animate-pulse" />
                  <div className="h-10 w-full max-w-xl bg-gray-100 rounded-lg animate-pulse" />
                </div>
              </div>

              <div className="hidden sm:grid sm:grid-cols-[0.9fr_1.6fr_1fr_1fr_1fr] text-xs font-semibold uppercase tracking-wide text-gray-400 border-b border-gray-200 pb-3">
                <div className="h-3 w-10 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-14 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-16 bg-gray-200 rounded ms-auto animate-pulse" />
              </div>

              <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <CartItemSkeleton key={idx} />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-28 rounded-2xl border border-gray-200 bg-white p-4">
                <div className="h-full w-full bg-gray-100 rounded-lg animate-pulse" />
              </div>
              <div className="h-24 rounded-2xl border border-gray-200 bg-white p-4">
                <div className="h-full w-full bg-gray-100 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:self-start">
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
            <div className="rounded-2xl border border-gray-200 bg-white p-4 space-y-3">
              <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="section-container">
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="aspect-4/4.5 bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPageSkeleton;
