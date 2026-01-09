'use client';

import Image from 'next/image';
import { FC } from 'react';

export interface Subcategory {
  id: string;
  name: string;
  image: string;
  imageAlt?: string;
}

interface SubCategoryCardProps {
  subcategory: Subcategory;
  index: number;
}

const SubCategoryCard: FC<SubCategoryCardProps> = ({ subcategory }) => {
  return (
    <div className="flex flex-col items-center gap-3 cursor-pointer group/card bg-soft-pink pb-2 rounded-lg">
      <div className="relative w-full aspect-square rounded-lg overflow-hidden ">
        <Image
          src={subcategory.image}
          alt={subcategory.imageAlt || subcategory.name}
          fill
          className="object-cover group-hover/card:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      </div>
      <span className="text-sm font-medium text-gray-800 text-center group-hover/card:text-deep-maroon transition-colors">
        {subcategory.name}
      </span>
    </div>
  );
};

export default SubCategoryCard;
