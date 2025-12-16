'use client';

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
    id: 'corner-sofas',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=500&fit=crop',
    imageAlt: 'Corner Sofas',
    discount: 'Up to 40% Off',
    category: 'Corner Sofas',
  },
  {
    id: 'dining-tables',
    image:
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&h=500&fit=crop',
    imageAlt: 'Dining Tables',
    discount: 'Up to 40% Off',
    category: 'Dining Tables',
  },
  {
    id: 'bedroom-sets',
    image:
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=500&fit=crop',
    imageAlt: 'Bedroom Sets',
    discount: 'Up to 40% Off',
    category: 'Bedroom Sets',
  },
  {
    id: 'office-furniture',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=500&fit=crop',
    imageAlt: 'Office Furniture',
    discount: 'Up to 40% Off',
    category: 'Office Furniture',
  },
];

const PromotionalOffers: FC = () => {
  return (
    <motion.section
      className="container mx-auto px-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            image={offer.image}
            imageAlt={offer.imageAlt}
            discount={offer.discount}
            category={offer.category}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default PromotionalOffers;
