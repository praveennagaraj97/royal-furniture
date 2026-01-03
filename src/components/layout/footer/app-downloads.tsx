'use client';

import { StaggerItem } from '@/components/shared/animations';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';

import appStoreBadge from '@/assets/app-store-badge.svg';
import googlePlayBadge from '@/assets/google-play-badge.svg';

const AppDownloads: FC = () => {
  const t = useTranslations('footer.appDownloads');

  return (
    <StaggerItem
      type="slideUp"
      distance={20}
      duration={0.5}
      className="flex flex-col gap-3"
    >
      <p className="text-gray-700 text-sm font-medium">{t('downloadOurApp')}</p>
      <div className="flex flex-wrap gap-3">
        {/* Google Play Badge */}
        <a
          href="#"
          className="inline-block hover:opacity-80 transition-opacity duration-200"
        >
          <Image
            src={googlePlayBadge}
            alt={t('getItOnGooglePlay')}
            width={162}
            height={48}
            className="h-12 w-auto"
          />
        </a>
        {/* App Store Badge */}
        <a
          href="#"
          className="inline-block hover:opacity-80 transition-opacity duration-200"
        >
          <Image
            src={appStoreBadge}
            alt={t('downloadOnAppStore')}
            width={162}
            height={48}
            className="h-12 w-auto"
          />
        </a>
      </div>
    </StaggerItem>
  );
};

export default AppDownloads;
