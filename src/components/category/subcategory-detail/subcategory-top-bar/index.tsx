'use client';

import { ViewOnce } from '@/components/shared/animations';
import SortDropdown, { SortOption } from '@/components/shared/sort-dropdown';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { FiChevronDown, FiFilter } from 'react-icons/fi';

interface SubcategoryTopBarProps {
  productCount: number;
  isFilterVisible: boolean;
  onToggleFilter: () => void;
  sortOptions: SortOption[];
  selectedSort: string;
  onSortChange: (sortId: string) => void;
  gridColumns: 3 | 4 | 5;
  onGridColumnsChange: (columns: 3 | 4 | 5) => void;
}

const SubcategoryTopBar: FC<SubcategoryTopBarProps> = ({
  productCount,
  isFilterVisible,
  onToggleFilter,
  sortOptions,
  selectedSort,
  onSortChange,
  gridColumns,
  onGridColumnsChange,
}) => {
  const tCommon = useTranslations('common');
  const tCategory = useTranslations('categories.subcategory.topBar');
  const viewOptions: Array<3 | 4 | 5> = [3, 4, 5];

  const renderViewIcon = (columns: number) => (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: columns }).map((_, index) => (
        <span
          key={index}
          className="w-0.5 h-4 rounded-full bg-current"
          style={{ opacity: 0.55 + index * 0.12 }}
        />
      ))}
    </span>
  );

  return (
    <ViewOnce
      className="hidden lg:block"
      type="slideDown"
      distance={10}
      duration={0.3}
      delay={0.1}
    >
      <div className="mt-3 flex flex-col gap-2">
        <p className="text-xs sm:text-sm font-medium text-indigo-slate lg:hidden">
          {tCommon('productCount', { count: productCount })}
        </p>

        <div className="flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            onClick={onToggleFilter}
            className="hidden lg:inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 group shrink-0"
          >
            <FiFilter className="w-4 h-4 text-deep-maroon shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-indigo-slate whitespace-nowrap">
              {isFilterVisible
                ? tCategory('hideFilter')
                : tCategory('showFilter')}
            </span>
            <FiChevronDown
              className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-600 group-hover:text-deep-maroon transition-all duration-200 shrink-0 lg:${
                isFilterVisible ? 'rotate-180' : ''
              }`}
            />
          </motion.button>

          <div className="hidden lg:flex items-center gap-2 sm:gap-4 ml-auto">
            <div className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm font-medium text-indigo-slate">
              <span>{tCommon('productCount', { count: productCount })}</span>
            </div>

            <div
              className="flex items-center gap-1 bg-gray-100 rounded-lg p-1"
              role="group"
              aria-label={tCategory('gridViewAria')}
            >
              {viewOptions.map((columns) => {
                const isActive = gridColumns === columns;
                return (
                  <button
                    key={columns}
                    type="button"
                    onClick={() => onGridColumnsChange(columns)}
                    className={`relative flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-semibold transition-colors duration-200 ${
                      isActive
                        ? 'text-deep-maroon'
                        : 'text-gray-600 hover:text-deep-maroon'
                    }`}
                    aria-pressed={isActive}
                    aria-label={`${tCategory('gridViewAria')} ${columns}`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="grid-view-selector"
                        className="absolute inset-0 rounded-md bg-white shadow-sm"
                        transition={{
                          type: 'spring',
                          stiffness: 450,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {renderViewIcon(columns)}
                      <span>{columns}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="inline-flex">
              <SortDropdown
                sortOptions={sortOptions}
                selectedSort={selectedSort}
                onSortChange={onSortChange}
              />
            </div>
          </div>
        </div>
      </div>
    </ViewOnce>
  );
};

export default SubcategoryTopBar;
