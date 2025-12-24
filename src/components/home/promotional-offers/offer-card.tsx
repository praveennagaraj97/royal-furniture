'use client';

import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import { FC, useState } from 'react';

export interface OfferCardProps {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
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
  title,
  description,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md hover:shadow-lg cursor-pointer transition-shadow duration-300 min-w-80"
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
      <div className="relative h-full flex flex-col justify-center px-3 sm:px-4 md:px-6 py-4 z-10">
        <h3 className="text-xl sm:text-2xl font-medium  mb-2">{title}</h3>
        <p className="text-base leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

export default OfferCard;
