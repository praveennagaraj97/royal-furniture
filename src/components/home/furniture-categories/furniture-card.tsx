'use client';

import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import { FC } from 'react';

export interface FurnitureCardProps {
  image: string;
  imageAlt: string;
  name: string;
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

const FurnitureCard: FC<FurnitureCardProps> = ({ image, imageAlt, name }) => {
  return (
    <motion.div
      variants={cardVariants}
      className="relative w-full cursor-pointer group"
    >
      <div className="relative w-full aspect-video">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-md"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
        />
      </div>
      <div className="text-center pt-1.5">
        <p>{name}</p>
      </div>
    </motion.div>
  );
};

export default FurnitureCard;
