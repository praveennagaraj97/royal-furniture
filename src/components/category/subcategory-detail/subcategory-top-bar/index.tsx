'use client';

import { ViewOnce } from '@/components/shared/animations';
import SortDropdown, { SortOption } from '@/components/shared/sort-dropdown';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { FiChevronDown, FiFilter, FiGrid } from 'react-icons/fi';

interface SubcategoryTopBarProps {
  productCount: number;
  isFilterVisible: boolean;
  onToggleFilter: () => void;
  sortOptions: SortOption[];
  selectedSort: string;
  onSortChange: (sortId: string) => void;
}

const SubcategoryTopBar: FC<SubcategoryTopBarProps> = ({
  productCount,
  isFilterVisible,
  onToggleFilter,
  sortOptions,
  selectedSort,
  onSortChange,
}) => {
  return (
    <ViewOnce type="slideDown" distance={10} duration={0.3} delay={0.1}>
      <div className="flex items-center justify-between gap-2 sm:gap-4 flex-wrap mt-3">
        {/* Left Side - Toggle Filter Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          onClick={onToggleFilter}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 group shrink-0"
        >
          <FiFilter className="w-4 h-4 text-deep-maroon shrink-0" />
          <span className="text-xs sm:text-sm font-semibold text-indigo-slate whitespace-nowrap">
            {isFilterVisible ? 'Hide Filter' : 'Show Filter'}
          </span>
          <FiChevronDown
            className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-600 group-hover:text-deep-maroon transition-all duration-200 shrink-0 lg:${
              isFilterVisible ? 'rotate-180' : ''
            }`}
          />
        </motion.button>

        {/* Right Side - Product Count, Grid Icon, Sort Dropdown */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
          {/* Product Count - Desktop only */}
          <div className="hidden lg:flex px-3 py-1.5 bg-gray-100 rounded-lg text-sm font-medium text-indigo-slate space-x-1">
            <span className=" font-semibold">{productCount}</span>
            <span>{productCount === 1 ? 'Product' : 'Products'}</span>
          </div>

          {/* Grid View Icon - Desktop only */}
          <button
            className="hidden lg:flex p-2 text-deep-maroon hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label="Grid view"
          >
            <FiGrid className="w-5 h-5" />
          </button>

          {/* Sort Dropdown */}
          <SortDropdown
            sortOptions={sortOptions}
            selectedSort={selectedSort}
            onSortChange={onSortChange}
          />
        </div>
      </div>
    </ViewOnce>
  );
};

export default SubcategoryTopBar;
