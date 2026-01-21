'use client';

import { ViewOnce } from '@/components/shared/animations';
import type { FC } from 'react';

export interface AvailabilityBannerProps {
  stockCount?: number;
  threshold?: number;
}

export const AvailabilityBanner: FC<AvailabilityBannerProps> = ({
  stockCount,
  threshold = 5,
}) => {
  if (!stockCount || stockCount > threshold) {
    return null;
  }

  return (
    <ViewOnce
      type="fade"
      duration={0.3}
      delay={0.05}
      amount={0.01}
      margin="-100px"
    >
      <div className="w-full bg-red-600 text-white text-center py-2 px-4 rounded-lg mb-3">
        <span className="text-sm font-semibold">
          Order now only {stockCount} left.
        </span>
      </div>
    </ViewOnce>
  );
};
