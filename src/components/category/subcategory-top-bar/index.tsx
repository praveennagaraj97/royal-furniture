'use client';

import { ViewOnce } from '@/components/shared/animations';
import Dropdown from '@/components/shared/dropdown';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { BiSortAlt2 } from 'react-icons/bi';
import { FiChevronDown, FiFilter, FiGrid } from 'react-icons/fi';

interface SubcategoryTopBarProps {
  productCount: number;
  isFilterVisible: boolean;
  onToggleFilter: () => void;
  sortOptions: { id: string; label: string }[];
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
  const selectedSortLabel =
    sortOptions.find((opt) => opt.id === selectedSort)?.label ||
    sortOptions[0]?.label ||
    'Recommended';

  return (
    <ViewOnce type="slideDown" distance={10} duration={0.3} delay={0.1}>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Left Side - Toggle Filter Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          onClick={onToggleFilter}
          className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 group"
        >
          <FiFilter className="w-4 h-4 text-deep-maroon" />
          <span className="text-sm font-medium text-gray-900">
            {isFilterVisible ? 'Hide Filter' : 'Show Filter'}
          </span>
          <FiChevronDown
            className={`w-4 h-4 text-gray-600 group-hover:text-deep-maroon transition-all duration-200 lg:${
              isFilterVisible ? 'rotate-180' : ''
            }`}
          />
        </motion.button>

        {/* Right Side - Product Count, Grid Icon, Sort Dropdown */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Product Count */}
          <div className="px-3 py-1.5 bg-gray-100 rounded-lg">
            <span className="text-sm font-medium text-gray-900">
              {productCount} Products
            </span>
          </div>

          {/* Grid View Icon */}
          <button
            className="p-2 text-deep-maroon hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label="Grid view"
          >
            <FiGrid className="w-5 h-5" />
          </button>

          {/* Sort Dropdown */}
          <Dropdown
            align="right"
            trigger={
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 group">
                <div className="flex items-center gap-1.5 text-deep-maroon">
                  <BiSortAlt2 className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Sort by: {selectedSortLabel}
                </span>
                <FiChevronDown className="w-4 h-4 text-gray-600 group-hover:text-deep-maroon transition-colors" />
              </div>
            }
          >
            <div>
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => onSortChange(option.id)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 whitespace-nowrap ${
                    selectedSort === option.id
                      ? 'bg-deep-maroon/10 text-deep-maroon font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </Dropdown>
        </div>
      </div>
    </ViewOnce>
  );
};

export default SubcategoryTopBar;
