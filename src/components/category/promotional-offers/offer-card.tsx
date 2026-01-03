'use client';

import { StaggerItem } from '@/components/shared/animations';
import Image from 'next/image';
import { FC } from 'react';

export interface OfferCardProps {
  image: string;
  imageAlt: string;
  discount: string;
  category: string;
}

const OfferCard: FC<OfferCardProps> = ({
  image,
  imageAlt,
  discount,
  category,
}) => {
  return (
    <StaggerItem
      type="slideUp"
      distance={30}
      duration={0.6}
      className="relative w-full aspect-4/5 rounded-xl overflow-hidden bg-white shadow-sm cursor-pointer group"
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
      {/* Dark overlay at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-linear-to-t from-black/70 via-black/60 to-transparent" />
      {/* Text content */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center pb-6 px-4 text-white">
        <p className="text-lg font-medium mb-1">{discount}</p>
        <p className="text-lg font-medium">{category}</p>
      </div>
    </StaggerItem>
  );
};

export default OfferCard;
