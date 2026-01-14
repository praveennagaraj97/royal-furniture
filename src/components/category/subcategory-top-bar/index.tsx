'use client';

import { ViewOnce } from '@/components/shared/animations';
import Dropdown from '@/components/shared/dropdown';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { BiSortAlt2 } from 'react-icons/bi';
import { FiChevronDown, FiFilter } from 'react-icons/fi';

interface SubcategoryTopBarProps {
  isFilterVisible: boolean;
  onToggleFilter: () => void;
  sortOptions: { id: string; label: string }[];
  selectedSort: string;
  onSortChange: (sortId: string) => void;
}

const SubcategoryTopBar: FC<SubcategoryTopBarProps> = ({
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
      <div className="flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
        {/* Left Side - Toggle Filter Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          onClick={onToggleFilter}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 group shrink-0"
        >
          <FiFilter className="w-4 h-4 text-deep-maroon shrink-0" />
          <span className="text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
            {isFilterVisible ? 'Hide Filter' : 'Show Filter'}
          </span>
          <FiChevronDown
            className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-600 group-hover:text-deep-maroon transition-all duration-200 shrink-0 lg:${
              isFilterVisible ? 'rotate-180' : ''
            }`}
          />
        </motion.button>

        {/* Right Side - Sort Dropdown */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
          {/* Sort Dropdown */}
          <Dropdown
            align="right"
            trigger={
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 group shrink-0">
                <div className="flex items-center gap-1 sm:gap-1.5 text-deep-maroon shrink-0">
                  <BiSortAlt2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                  <span className="hidden sm:inline">Sort by: </span>
                  {selectedSortLabel}
                </span>
                <FiChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 group-hover:text-deep-maroon transition-colors shrink-0" />
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
