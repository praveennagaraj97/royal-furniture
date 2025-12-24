'use client';

import Swiper from '@/components/shared/swiper';
import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import { FC, useState } from 'react';

export interface HouseholdItem {
  id: string;
  image: string;
  imageAlt: string;
  label: string;
}

interface HouseholdShowcaseProps {
  items: HouseholdItem[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

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

const HouseholdShowcase: FC<HouseholdShowcaseProps> = ({ items }) => {
  return (
    <motion.div
      className={`container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3 overflow-hidden md:overflow-visible pb-4`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <Swiper gap={4} showNavigation hideArrowOnMobile>
        {items.map((item) => (
          <HouseholdCard key={item.id} item={item} />
        ))}
      </Swiper>
    </motion.div>
  );
};

const HouseholdCard: FC<{ item: HouseholdItem }> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      className="flex flex-col w-full min-w-[200px] sm:min-w-[220px] md:min-w-[240px] lg:min-w-[260px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Image Container */}
      <div className="relative w-full aspect-3/4 rounded-2xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer transition-all duration-300">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          className="object-cover transition-transform duration-300"
          sizes="(max-width: 640px) 200px, (max-width: 768px) 220px, (max-width: 1024px) 240px, 260px"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
      </div>

      {/* Label Text Below Card */}
      <div className="mt-3 text-center">
        <h3 className="text-black text-lg sm:text-xl font-semibold">
          {item.label}
        </h3>
      </div>
    </motion.div>
  );
};

export default HouseholdShowcase;
