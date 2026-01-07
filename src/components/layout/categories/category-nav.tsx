'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { AppLink } from '@/hooks';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import CategoryDropdown, { DropdownData } from './category-dropdown';

export interface Category {
  id: string;
  key: string;
}

interface CategoryNavProps {
  categories: Category[];
  selectedCategory: string;
}

const MOCK_DROPDOWN_DATA: Record<string, DropdownData> = {
  sofa: {
    columns: [
      {
        title: 'Sectional Sofa',
        links: [
          { label: 'Sofa and sectionals', href: '#' },
          { label: 'Sofa Cover', href: '#' },
          { label: 'Sofa set', href: '#' },
        ],
      },
      {
        title: 'Lounge',
        links: [
          { label: 'Sofa and sectionals', href: '#' },
          { label: 'Sofa Cover', href: '#' },
        ],
      },
      {
        title: 'Living Room',
        links: [
          { label: 'TV Stand', href: '#' },
          { label: 'Coffee Table', href: '#' },
          { label: 'Bookshelf', href: '#' },
        ],
      },
      {
        title: 'Popular',
        links: [
          { label: 'Best Sellers', href: '#' },
          { label: 'New Arrivals', href: '#' },
        ],
      },
    ],
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop',
  },
  'living-room': {
    columns: [
      {
        title: 'TV Units',
        links: [
          { label: 'Wall Mounted', href: '#' },
          { label: 'Floor Standing', href: '#' },
        ],
      },
      {
        title: 'Tables',
        links: [
          { label: 'Coffee Tables', href: '#' },
          { label: 'Side Tables', href: '#' },
          { label: 'Console Tables', href: '#' },
        ],
      },
      {
        title: 'Seating',
        links: [
          { label: 'Arm Chairs', href: '#' },
          { label: 'Recliners', href: '#' },
          { label: 'Bean Bags', href: '#' },
        ],
      },
      {
        title: 'Storage',
        links: [
          { label: 'Bookshelves', href: '#' },
          { label: 'Cabinets', href: '#' },
          { label: 'Showcases', href: '#' },
        ],
      },
    ],
    image:
      'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&h=400&fit=crop',
  },
  // Add other categories as needed...
};

const CategoryNav: FC<CategoryNavProps> = ({
  categories,
  selectedCategory,
}) => {
  const t = useTranslations('categories');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // We only show dropdown if we have data for that category
  const activeDropdownData = hoveredCategory
    ? MOCK_DROPDOWN_DATA[hoveredCategory]
    : null;

  return (
    <div
      className="shadow-md relative z-40"
      onMouseLeave={() => setHoveredCategory(null)}
    >
      <nav className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3 ">
        {/* Mobile: horizontal scroll, Desktop: centered wrap */}
        <StaggerContainer
          mode="animate"
          staggerChildren={0.05}
          delayChildren={0}
          duration={0.3}
          className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar sm:justify-center sm:flex-wrap py-3"
        >
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id;
            const href = category.id === 'all' ? '/' : `/${category.id}`;

            return (
              <StaggerItem
                key={category.id}
                type="slide"
                direction="down"
                distance={10}
                duration={0.3}
                className="shrink-0"
              >
                <div
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  className="relative"
                >
                  <AppLink
                    href={href}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors block hover:scale-105 active:scale-95 ${
                      isSelected
                        ? 'bg-deep-maroon text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t(category.key)}
                  </AppLink>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </nav>

      {/* 
        Position Dropdown absolutely relative to the wrapper div.
        It will appear full width below the nav bar.
      */}
      <CategoryDropdown
        isOpen={!!activeDropdownData}
        data={activeDropdownData || null}
        onMouseEnter={() => {}} // Keep open when hovering the dropdown itself if needed, but the wrapper handles mouse leave
        onMouseLeave={() => {}}
      />
    </div>
  );
};

export default CategoryNav;
