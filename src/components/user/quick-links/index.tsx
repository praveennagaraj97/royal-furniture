'use client';

import { StaggerContainer } from '@/components/shared/animations';
import { FC } from 'react';
import ExclusiveOffersBanner from './exclusive-offers-banner';
import QuickLinksGrid from './quick-links-grid';

const UserPageContent: FC = () => {
  return (
    <StaggerContainer staggerChildren={0.1} delayChildren={0.1}>
      <ExclusiveOffersBanner />
      <QuickLinksGrid />
    </StaggerContainer>
  );
};

export default UserPageContent;

