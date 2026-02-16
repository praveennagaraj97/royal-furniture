'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { AppLink } from '@/hooks';
import { FC } from 'react';

export interface LinkColumnProps {
  title: string;
  links: string[];
}

const LinkColumn: FC<LinkColumnProps> = ({ title, links }) => {
  return (
    <StaggerItem
      type="slide"
      direction="left"
      distance={10}
      duration={0.3}
      className="flex flex-col gap-2"
    >
      <h3 className="  font-bold text-base">{title}</h3>
      <StaggerContainer
        staggerChildren={0.05}
        delayChildren={0.1}
        className="flex flex-col gap-1.5"
      >
        {links.map((link, index) => (
          <StaggerItem
            key={index}
            type="slide"
            direction="left"
            distance={10}
            duration={0.3}
          >
            <AppLink
              href="#"
              className="text-gray-700 text-sm hover:text-deep-maroon transition-colors duration-200"
            >
              {link}
            </AppLink>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </StaggerItem>
  );
};

export default LinkColumn;
