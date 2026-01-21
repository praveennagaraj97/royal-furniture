'use client';

import ResponsiveImage from '@/components/shared/ui/responsive-image';
import { AppLink } from '@/hooks';
import { SubCategoryItem } from '@/types';
import { FC } from 'react';

interface SubCategoryCardProps {
  subcategory: SubCategoryItem;
  categorySlug: string;
  isActive?: boolean;
}

const SubCategoryCard: FC<SubCategoryCardProps> = ({
  subcategory,
  categorySlug,
  isActive = false,
}) => {
  return (
    <AppLink
      href={`/${categorySlug}/${subcategory.slug}`}
      className={`flex flex-col items-center gap-2 cursor-pointer group/card bg-soft-pink pb-1 rounded-lg transition-all duration-300 ${
        isActive ? 'border border-deep-maroon shadow-lg' : ''
      }`}
    >
      <div className="relative w-full aspect-square rounded-lg overflow-hidden">
        <ResponsiveImage
          images={subcategory.responsive_images}
          alt={subcategory.name}
          className="object-cover group-hover/card:scale-105 transition-transform duration-300"
        />
      </div>
      <span
        className={`text-xs sm:text-sm font-medium transition-colors line-clamp-1 text-center ${
          isActive
            ? 'text-deep-maroon'
            : 'text-gray-800  group-hover/card:text-deep-maroon'
        }`}
      >
        {subcategory.name}
      </span>
    </AppLink>
  );
};

export default SubCategoryCard;
