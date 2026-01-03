'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { HelpCircle, Mail, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';

import facebookIcon from '@/assets/social/facebook.png';
import instagramIcon from '@/assets/social/insta.png';
import xIcon from '@/assets/social/twitter.png';
import youtubeIcon from '@/assets/social/youtube.png';

const SupportLinks: FC = () => {
  const t = useTranslations('footer.support');
  const tSocial = useTranslations('footer.social');

  return (
    <StaggerContainer
      staggerChildren={0.1}
      delayChildren={0.1}
      className="flex flex-col gap-3"
    >
      <h3 className="text-gray-900 font-bold text-base">{t('title')}</h3>
      <div className="flex flex-col gap-3">
        {/* Call Customer Support */}
        <StaggerItem
          type="slide"
          direction="left"
          distance={10}
          duration={0.3}
          className="flex items-start gap-3"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-500 shrink-0">
            <Phone className="w-5 h-5 text-gray-700" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-900 font-semibold text-sm">
              {t('callCustomerSupport')}
            </span>
            <span className="text-gray-600 text-sm">2942 87687 989</span>
          </div>
        </StaggerItem>

        {/* Write to us */}
        <StaggerItem
          type="slide"
          direction="left"
          distance={10}
          duration={0.3}
          className="flex items-start gap-3"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-500 shrink-0">
            <Mail className="w-5 h-5 text-gray-700" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-900 font-semibold text-sm">
              {t('writeToUs')}
            </span>
            <span className="text-gray-600 text-sm">
              www.furniture@g.ail.com
            </span>
          </div>
        </StaggerItem>

        {/* Help Center */}
        <StaggerItem
          type="slide"
          direction="left"
          distance={10}
          duration={0.3}
          className="flex items-start gap-3"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-500 shrink-0">
            <HelpCircle className="w-5 h-5 text-gray-700" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-900 font-semibold text-sm">
              {t('helpCenter')}
            </span>
            <span className="text-gray-600 text-sm">
              www.furniture@g.ail.com
            </span>
          </div>
        </StaggerItem>
      </div>

      {/* Social Media Icons */}
      <StaggerContainer
        staggerChildren={0.1}
        delayChildren={0.1}
        className="flex items-center gap-3 pt-2"
      >
        {/* Instagram */}
        <StaggerItem type="slide" direction="left" distance={10} duration={0.3}>
          <a
            href="#"
            className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200"
          >
            <Image
              src={instagramIcon}
              alt={tSocial('instagram')}
              width={32}
              height={32}
              className="w-full h-full object-contain"
            />
          </a>
        </StaggerItem>
        {/* Facebook */}
        <StaggerItem type="slide" direction="left" distance={10} duration={0.3}>
          <a
            href="#"
            className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200"
          >
            <Image
              src={facebookIcon}
              alt={tSocial('facebook')}
              width={32}
              height={32}
              className="w-full h-full object-contain"
            />
          </a>
        </StaggerItem>
        {/* X */}
        <StaggerItem type="slide" direction="left" distance={10} duration={0.3}>
          <a
            href="#"
            className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200"
          >
            <Image
              src={xIcon}
              alt={tSocial('x')}
              width={32}
              height={32}
              className="w-full h-full object-contain"
            />
          </a>
        </StaggerItem>
        {/* YouTube */}
        <StaggerItem type="slide" direction="left" distance={10} duration={0.3}>
          <a
            href="#"
            className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200"
          >
            <Image
              src={youtubeIcon}
              alt={tSocial('youtube')}
              width={32}
              height={32}
              className="w-full h-full object-contain"
            />
          </a>
        </StaggerItem>
      </StaggerContainer>
    </StaggerContainer>
  );
};

export default SupportLinks;
