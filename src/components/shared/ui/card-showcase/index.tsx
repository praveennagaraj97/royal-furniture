'use client';

import Swiper from '@/components/shared/swiper';
import { motion, type Variants } from 'framer-motion';
import { FC } from 'react';
import CardShowcaseCard from './card';

export interface CardItem {
  id: string;
  image: string;
  imageAlt: string;
  label: string;
}

export interface CardShowcaseProps {
  items: CardItem[];
  className?: string;
  cardAspectRatio?: string;
  cardMinWidth?: string;
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

const CardShowcase: FC<CardShowcaseProps> = ({
  items,
  className = '',
  cardAspectRatio = 'aspect-3/5',
  cardMinWidth = 'min-w-[280px] sm:min-w-[320px] md:min-w-[360px]',
}) => {
  return (
    <motion.section
      className={`container mx-auto px-3 overflow-hidden md:overflow-visible pb-4 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <Swiper gap={4} showNavigation hideArrowOnMobile>
        {items.map((item) => (
          <CardShowcaseCard
            key={item.id}
            image={item.image}
            imageAlt={item.imageAlt}
            label={item.label}
            aspectRatio={cardAspectRatio}
            minWidth={cardMinWidth}
          />
        ))}
      </Swiper>
    </motion.section>
  );
};

export default CardShowcase;
