'use client';

import { StaggerContainer } from '@/components/shared/animations';
import Swiper from '@/components/shared/swiper';
import { BannerItem } from '@/types';
import { FC } from 'react';
import OfferCard from './offer-card';

interface PromotionalOffersProps {
  offers: BannerItem[];
}

const PromotionalOffers: FC<PromotionalOffersProps> = ({ offers }) => {
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
            image={offer.image || ''}
            imageAlt={offer.description}
            title={offer.title}
            description={offer.description}
          />
        ))}
      </Swiper>
    </StaggerContainer>
  );
};

export default PromotionalOffers;
