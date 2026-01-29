'use client';

import { StaggerContainer } from '@/components/shared/animations';
import Swiper from '@/components/shared/swiper';

import { BannerItem } from '@/types/response/home';
import { FC } from 'react';
import OfferCard from './offer-card';

interface OffersProps {
  offers: BannerItem[];
  gridNumber: number;
}

const Offers: FC<OffersProps> = ({ offers }) => {
  return (
    <StaggerContainer
      staggerChildren={0.15}
      delayChildren={0.1}
      className="section-container overflow-hidden md:overflow-visible"
    >
      <Swiper gap={4} showNavigation hideArrowOnMobile>
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            images={offer.responsive_images}
            imageAlt={offer.offer_text || ''}
            title={offer.offer_text || ''}
            description={offer.offer_text || ''}
          />
        ))}
      </Swiper>
    </StaggerContainer>
  );
};

export default Offers;
