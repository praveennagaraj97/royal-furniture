'use client';

import { AppLink } from '@/hooks';
import { FC } from 'react';
import { FiChevronRight } from 'react-icons/fi';

interface CheckoutBreadcrumbsProps {
  paths?: { label: string; href?: string }[];
}

export const CheckoutBreadcrumbs: FC<CheckoutBreadcrumbsProps> = ({
  paths = [
    { label: 'Home', href: '/' },
    { label: 'Sofas', href: '#' },
    { label: 'Royal Wooden Sofa' },
  ],
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 gap-1 sm:gap-2"
    >
      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;
        const Separator =
          index > 0 ? (
            <FiChevronRight
              key={`separator-${path.label}`}
              className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400"
            />
          ) : null;

        return (
          <span key={path.label} className="flex items-center gap-1 sm:gap-2">
            {Separator}
            {path.href && !isLast ? (
              <AppLink
                href={path.href}
                className="hover:text-deep-maroon transition-colors duration-200"
              >
                {path.label}
              </AppLink>
            ) : (
              <span className="font-medium text-gray-600">{path.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
};
