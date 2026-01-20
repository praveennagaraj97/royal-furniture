'use client';

import { AppLink } from '@/hooks';
import { SubCategoryItem } from '@/types';
import Image from 'next/image';
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
        <Image
          src={subcategory.image}
          alt={subcategory.name}
          fill
          className="object-cover group-hover/card:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
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
