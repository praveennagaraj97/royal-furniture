'use client';

import { FC } from 'react';
import { BiSortAlt2 } from 'react-icons/bi';
import { FiChevronDown } from 'react-icons/fi';
import Dropdown from './dropdown';

export interface SortOption {
  id: string;
  label: string;
}

interface SortDropdownProps {
  sortOptions: SortOption[];
  selectedSort: string;
  onSortChange: (sortId: string) => void;
}

const SortDropdown: FC<SortDropdownProps> = ({
  sortOptions,
  selectedSort,
  onSortChange,
}) => {
  const selectedSortLabel =
    sortOptions.find((opt) => opt.id === selectedSort)?.label ||
    sortOptions[0]?.label ||
    'Recommended';

  return (
    <Dropdown
      align="right"
      trigger={
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 group shrink-0">
          <div className="flex items-center gap-1 sm:gap-1.5 text-deep-maroon shrink-0">
            <BiSortAlt2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <span className="text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
            <span className="hidden sm:inline font-semibold">Sort by: </span>
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
  );
};

export default SortDropdown;
