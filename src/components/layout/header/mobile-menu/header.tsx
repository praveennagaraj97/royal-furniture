'use client';

import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';
import { FiHeart, FiShoppingCart, FiX } from 'react-icons/fi';

import logo from '@/assets/logo.png';

interface MobileMenuHeaderProps {
  onClose: () => void;
}

export const MobileMenuHeader: FC<MobileMenuHeaderProps> = ({ onClose }) => {
  const t = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

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
          onClick={() => {
            const newLocale = locale === 'en' ? 'ar' : 'en';
            router.replace(pathname, { locale: newLocale });
          }}
          className="text-sm text-gray-700 hover:text-[#7F1D1D] transition-colors"
        >
          {locale === 'en' ? t('arabic') : t('english')}
        </button>
      </div>

      <Link href="/" onClick={onClose}>
        <Image
          src={logo}
          alt="Logo"
          priority
          quality={100}
          className="h-8 w-auto object-contain"
        />
      </Link>

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
