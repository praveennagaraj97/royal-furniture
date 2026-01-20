'use client';

import { StaggerItem } from '@/components/shared/animations';
import Image from 'next/image';
import { FC, useState } from 'react';

export interface OfferCardProps {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

const OfferCard: FC<OfferCardProps> = ({
  image,
  imageAlt,
  title,
  description,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <StaggerItem
      type="slideUp"
      distance={30}
      duration={0.6}
      className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md hover:shadow-lg cursor-pointer transition-shadow duration-300 min-w-64 sm:min-w-72 md:min-w-80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-300"
          sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 380px"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-linear-to-r from-white/50 via-white/30 to-transparent" />
      </div>

      {/* Text content overlaid on image */}
      <div className="relative h-full flex flex-col justify-center px-2 sm:px-3 md:px-4 py-2 z-10">
        <h3 className="text-lg sm:text-xl font-medium mb-1">{title}</h3>
        <p className="text-sm leading-relaxed">{description}</p>
      </div>
    </StaggerItem>
  );
};

export default OfferCard;
