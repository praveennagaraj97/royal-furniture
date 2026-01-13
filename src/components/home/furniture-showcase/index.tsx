'use client';

import type { CardItem } from '@/components/shared/ui/card-showcase';
import CardShowcase from '@/components/shared/ui/card-showcase';
import { FC } from 'react';

const HomeFurnitureShowcase: FC<{ items: CardItem[] }> = ({ items }) => {
  return <CardShowcase items={items} />;
};

export default HomeFurnitureShowcase;
