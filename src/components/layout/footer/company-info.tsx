'use client';

import { StaggerItem } from '@/components/shared/animations';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';

import logo from '@/assets/logo.png';
import { Link } from '@/i18n/routing';

const CompanyInfo: FC = () => {
  const t = useTranslations('footer.company');

  return (
    <StaggerItem
      type="slideUp"
      distance={20}
      duration={0.5}
      className="flex flex-col gap-3"
    >
      <div className="flex items-center gap-3">
        <Link href="/">
          <Image
            src={logo}
            alt="Royal Furniture"
            className="h-8 w-auto sm:h-10 md:h-12 object-contain"
            priority
          />
        </Link>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed max-w-md">
        {t('description')}
      </p>
      <button
        type="button"
        className="flex items-center justify-center gap-2 bg-deep-maroon text-white px-6 py-3 rounded-full font-medium hover:bg-[#6b0000] transition-colors duration-200 w-fit"
      >
        <span>{t('findOurStores')}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </StaggerItem>
  );
};

export default CompanyInfo;
