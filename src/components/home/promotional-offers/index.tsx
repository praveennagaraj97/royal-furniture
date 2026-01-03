'use client';

import { StaggerContainer } from '@/components/shared/animations';
import Swiper from '@/components/shared/swiper';
import { FC } from 'react';
import OfferCard from './offer-card';

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
    <StaggerContainer
      staggerChildren={0.15}
      delayChildren={0.1}
      className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3 overflow-hidden md:overflow-visible"
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
    </StaggerContainer>
  );
};

export default PromotionalOffers;
