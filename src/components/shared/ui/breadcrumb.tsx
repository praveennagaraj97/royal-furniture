'use client';

import { ViewOnce } from '@/components/shared/animations';
import { useAppRouter } from '@/hooks';
import { FC } from 'react';
import { FiChevronLeft } from 'react-icons/fi';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onBackClick?: () => void;
}

export const Breadcrumb: FC<BreadcrumbProps> = ({ items, onBackClick }) => {
  const router = useAppRouter();

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  const handleNavigate = (href?: string) => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <ViewOnce
      type="slideDown"
      distance={10}
      duration={0.4}
      margin="-50px"
      className="section-container py-2 sm:py-6"
    >
      <div className="sm:flex hidden items-center gap-2 overflow-x-auto no-scrollbar pr-3">
        {/* Back Arrow */}
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center text-deep-maroon transition-transform duration-200 hover:-translate-x-1"
          aria-label={'back'}
        >
          <FiChevronLeft className="h-5 w-5" />
        </button>

        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-600  whitespace-nowrap">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;

              return (
                <li key={index} className="flex items-center gap-2">
                  {index > 0 && <span className="text-gray-400">/</span>}

                  {isLast || !item.href ? (
                    <span className="font-medium   capitalize">
                      {item.label}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleNavigate(item.href)}
                      className="hover:text-deep-maroon transition-colors duration-200 capitalize"
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </ViewOnce>
  );
};
