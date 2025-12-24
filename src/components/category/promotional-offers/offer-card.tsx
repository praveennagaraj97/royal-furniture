'use client';

import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import { FC } from 'react';

export interface OfferCardProps {
  image: string;
  imageAlt: string;
  discount: string;
  category: string;
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

const OfferCard: FC<OfferCardProps> = ({
  image,
  imageAlt,
  discount,
  category,
}) => {
  return (
    <motion.div
      variants={cardVariants}
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
    </motion.div>
  );
};

export default OfferCard;
