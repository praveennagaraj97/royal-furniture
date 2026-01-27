'use client';

import { ViewOnce } from '@/components/shared/animations';
import SortDropdown, { SortOption } from '@/components/shared/sort-dropdown';
import { FC } from 'react';

interface SortBarProps {
  productCount: number;
  sortOptions: SortOption[];
  selectedSort: string;
  onSortChange: (sortId: string) => void;
}

const SortBar: FC<SortBarProps> = ({
  productCount,
  sortOptions,
  selectedSort,
  onSortChange,
}) => {
  return (
    <ViewOnce type="slideDown" distance={10} duration={0.3} delay={0.1}>
      <div className="flex items-center justify-end gap-2 sm:gap-4">
        {/* Product Count - Desktop only */}
        <div className="hidden lg:block px-3 py-1.5 bg-gray-100 rounded-lg">
          <span className="text-sm font-medium text-gray-900">
            {productCount} Products
          </span>
        </div>

        {/* Sort Dropdown */}
        <SortDropdown
          sortOptions={sortOptions}
          selectedSort={selectedSort}
          onSortChange={onSortChange}
        />
      </div>
    </ViewOnce>
  );
};

export default SortBar;
