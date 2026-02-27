'use client';

import Dropdown from '@/components/shared/dropdown';
import { SortOption } from '@/components/shared/sort-dropdown';
import { useTranslations } from 'next-intl';
import { FC, useMemo } from 'react';
import { BiSortAlt2 } from 'react-icons/bi';
import { FiFilter } from 'react-icons/fi';

interface MobileSortFilterControlsProps {
  sortOptions: SortOption[];
  selectedSort: string;
  onSortChange: (sortId: string) => void;
  onToggleFilter: () => void;
  isFilterVisible: boolean;
}

const MobileSortFilterControls: FC<MobileSortFilterControlsProps> = ({
  sortOptions,
  selectedSort,
  onSortChange,
  onToggleFilter,
  isFilterVisible,
}) => {
  const tSort = useTranslations('sort');
  const tCategory = useTranslations('categories.subcategory.topBar');

  const selectedSortLabel = useMemo(() => {
    return (
      sortOptions.find((option) => option.id === selectedSort)?.label ||
      sortOptions[0]?.label ||
      tSort('recommended')
    );
  }, [selectedSort, sortOptions, tSort]);

  return (
    <div className="fixed inset-x-0 bottom-4 z-30 flex justify-center px-4 pb-[calc(env(safe-area-inset-bottom,0px)+0.5rem)] pointer-events-none lg:hidden">
      <div className="pointer-events-auto inline-flex items-center rounded-full bg-[#3F3A36] text-white shadow-2xl ring-1 ring-black/20">
        <Dropdown
          align="left"
          trigger={
            <div className="flex items-center gap-2 px-5 py-3 text-sm font-semibold">
              <BiSortAlt2 className="h-5 w-5 text-white" />
              <div className="flex flex-col text-left leading-tight">
                <span className="tracking-wide">{tSort('sortBy')}</span>
                <span className="text-xs font-normal text-white/70">
                  {selectedSortLabel}
                </span>
              </div>
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

        <span className="h-8 w-px bg-white/20" />

        <button
          type="button"
          onClick={onToggleFilter}
          className="flex items-center gap-2 px-5 py-3 text-sm font-semibold"
        >
          <FiFilter className="h-5 w-5" />
          <span>
            {isFilterVisible
              ? tCategory('hideFilter')
              : tCategory('showFilter')}
          </span>
        </button>
      </div>
    </div>
  );
};

export default MobileSortFilterControls;
