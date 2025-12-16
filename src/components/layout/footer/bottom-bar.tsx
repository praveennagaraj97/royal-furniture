'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { motion, type Variants } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { FC } from 'react';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const BottomBar: FC = () => {
  const t = useTranslations('footer.bottomBar');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as 'en' | 'ar' });
  };

  return (
    <motion.div
      className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3"
      variants={itemVariants}
    >
      <p className="text-gray-700 text-sm">{t('copyright')}</p>
      <div className="flex items-center gap-4">
        {/* Region Selector */}
        <button
          type="button"
          className="flex items-center gap-2 text-gray-700 text-sm hover:text-deep-maroon transition-colors duration-200"
        >
          <span className="text-lg">🇦🇪</span>
          <span>{t('unitedArabEmirates')}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        {/* Language Selector */}
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-gray-700" />
          <div className="relative">
            <select
              value={locale}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="text-gray-700 text-sm bg-transparent border-none outline-none cursor-pointer hover:text-deep-maroon transition-colors duration-200 appearance-none pr-6 pl-2 py-1"
              aria-label="Select language"
            >
              <option value="en">{tCommon('english')}</option>
              <option value="ar">{tCommon('arabic')}</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-700 pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BottomBar;
