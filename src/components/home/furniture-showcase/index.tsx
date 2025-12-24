'use client';

import Swiper from '@/components/shared/swiper';
import { motion, type Variants } from 'framer-motion';
import { FC } from 'react';
import FurnitureCard from './furniture-card';

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

const furnitureItems = [
  {
    id: 'kids-bed',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=600&fit=crop',
    imageAlt: 'Kids Bed with teddy bear theme',
    label: 'Kids Bed',
  },
  {
    id: 'bedroom-set',
    image:
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=600&fit=crop',
    imageAlt: 'Modern Bedroom Set',
    label: 'Bedroom Set',
  },
  {
    id: 'premium-bed',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=600&fit=crop',
    imageAlt: 'Premium Bed and Lounge Set',
    label: 'Premium Bed',
  },
];

const FurnitureShowcase: FC = () => {
  return (
    <motion.section
      className="container mx-auto px-3 overflow-hidden md:overflow-visible pb-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <Swiper gap={4} showNavigation hideArrowOnMobile>
        {furnitureItems.map((item) => (
          <FurnitureCard
            key={item.id}
            image={item.image}
            imageAlt={item.imageAlt}
            label={item.label}
          />
        ))}
      </Swiper>
    </motion.section>
  );
};

export default FurnitureShowcase;
