'use client';

import { AppLink, useAppRouter } from '@/hooks';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { FiHeart, FiShoppingCart, FiX } from 'react-icons/fi';

import logo from '@/assets/logo.png';

interface MobileMenuHeaderProps {
  onClose: () => void;
}

export const MobileMenuHeader: FC<MobileMenuHeaderProps> = ({ onClose }) => {
  const t = useTranslations('common');
  const locale = useLocale();
  const router = useAppRouter();
  const pathname = usePathname();

  const handleLocaleChange = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    const segments = pathname.split('/').filter(Boolean);
    // segments[0] is country, segments[1] is locale
    const remainingPath = segments.slice(2).join('/');
    const newPath = `/${segments[0]}/${newLocale}${
      remainingPath ? `/${remainingPath}` : ''
    }`;
    router.replace(newPath);
    onClose();
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <FiX className="h-5 w-5 text-gray-600" />
        </button>
        <button
          type="button"
          onClick={handleLocaleChange}
          className="text-sm text-gray-700 hover:text-[#7F1D1D] transition-colors"
        >
          {locale === 'en' ? t('arabic') : t('english')}
        </button>
      </div>

      <AppLink href="/" onClick={onClose}>
        <Image
          src={logo}
          alt="Logo"
          priority
          quality={100}
          className="h-8 w-auto object-contain"
        />
      </AppLink>

      <div className="flex items-center gap-2">
        <button className="relative rounded-full text-black hover:text-[#7F1D1D] transition-colors p-2">
          <FiHeart className="h-5 w-5" />
        </button>
        <button className="relative rounded-full text-black hover:text-[#7F1D1D] transition-colors p-2">
          <FiShoppingCart className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
