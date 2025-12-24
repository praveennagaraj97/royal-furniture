'use client';

import Swiper from '@/components/shared/swiper';
import { motion, type Variants } from 'framer-motion';
import { FC } from 'react';
import OfferCard from './offer-card';

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

const offers = [
  {
    id: 'discount-offer',
    image:
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop',
    imageAlt: 'Bar stool with discounts',
    title: 'Up to 50% Off',
    description: 'Find products with discounts up to 50%',
  },
  {
    id: 'buy-one-get-one',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
    imageAlt: 'Two-seater sofa',
    title: 'Buy 1 Get 1',
    description: 'Grab exclusive sensitive offers.',
  },
  {
    id: 'desk-offer',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop',
    imageAlt: 'Wooden desk',
    title: 'Desk',
    description: 'Grab exclusive sensitive offers.',
  },
];

const PromotionalOffers: FC = () => {
  return (
    <motion.section
      className="container mx-auto px-3 overflow-hidden md:overflow-visible"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <Swiper gap={4} showNavigation hideArrowOnMobile>
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            image={offer.image}
            imageAlt={offer.imageAlt}
            title={offer.title}
            description={offer.description}
          />
        ))}
      </Swiper>
    </motion.section>
  );
};

export default PromotionalOffers;
