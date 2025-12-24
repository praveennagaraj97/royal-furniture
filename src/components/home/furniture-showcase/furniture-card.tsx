'use client';

import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import { FC, useState } from 'react';

export interface FurnitureCardProps {
  image: string;
  imageAlt: string;
  label: string;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const FurnitureCard: FC<FurnitureCardProps> = ({ image, imageAlt, label }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      className="flex flex-col w-full min-w-[280px] sm:min-w-[320px] md:min-w-[360px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Image Container */}
      <div className="relative w-full aspect-3/5 rounded-2xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer transition-all duration-300">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-300"
          sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 360px"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
      </div>

      {/* Label Text Below Card */}
      <div className="mt-3 text-center">
        <h3 className="text-black text-lg sm:text-xl font-semibold">{label}</h3>
      </div>
    </motion.div>
  );
};

export default FurnitureCard;
