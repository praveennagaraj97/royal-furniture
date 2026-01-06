'use client';

import { ViewOnce } from '@/components/shared/animations';
import { useAppRouter } from '@/hooks';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

interface BackLinkProps {
  onClick?: () => void;
  href?: string;
}

export const BackLink: FC<BackLinkProps> = ({ onClick, href }) => {
  const router = useAppRouter();
  const t = useTranslations('common');

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <ViewOnce
      type="slideDown"
      distance={10}
      duration={0.4}
      margin="-50px"
      className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3 py-6"
    >
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center gap-2 text-gray-700 hover:text-deep-maroon transition-all duration-200 group"
      >
        <FiArrowLeft className="h-5 w-5 text-deep-maroon transition-transform duration-200 group-hover:-translate-x-1" />
        <span className="font-medium">{t('back')}</span>
      </button>
    </ViewOnce>
  );
};
