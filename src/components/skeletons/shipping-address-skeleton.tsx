'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { FC } from 'react';

export const ShippingAddressSkeleton: FC = () => {
  return (
    <div className="space-y-3">
      <StaggerContainer
        mode="animate"
        staggerChildren={0.08}
        delayChildren={0.05}
      >
        {[0, 1].map((idx) => (
          <StaggerItem key={idx} type="slideUp" distance={16} duration={0.35}>
            <div className="animate-pulse rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm space-y-3">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-40 bg-gray-200 rounded" />
              <div className="h-3 w-56 bg-gray-200 rounded" />
              <div className="h-3 w-48 bg-gray-200 rounded" />
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
};

export default ShippingAddressSkeleton;
